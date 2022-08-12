import { Appointment, AppointmentStatusEnum, Availability, AvailabilityDayOfTheWeekEnum } from '@empath/api-lib';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import EmpathCalendar from 'components/Calendar';
import SitewideLoader from 'components/SitewideLoader';
import { DAYS_OF_THE_WEEK, DAYS_OF_THE_WEEK_MAPPING } from 'constants/days-of-the-week';
import { useUserContext } from 'contexts/UserProvider';
import { fetchAppointments } from 'services/AppointmentService';
import { fetchMentalHealthProfessionalAvailabilities } from 'services/AvailabilityService';
import { formateDateToInternationalFormat, getWeeksGivenRange } from 'utils/DateUtils';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

enum Category {
  TIME = 'time',
}

export type DateRange = {
    start: Date;
    end: Date
}

type Props = {
    editSchedule: boolean;
    onEditSchedule: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverallScheduleCalendar(props: Props) {
  const { editSchedule, onEditSchedule } = props;
  const [dateRange, setDateRange] = useState<DateRange>();
  const [existingAvailabilities, setExistingAvailabilities] = useState<
        Availability[] | null
    >([]);
  const [currentAvailabilities, setCurrentAvailabilities] = useState<
        Availability[] | null
    >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userDetails } = useUserContext();

  useEffect(() => {
    async function getAvailabilities(id: string) {
      setIsLoading(true);

      const availabilities = await fetchMentalHealthProfessionalAvailabilities({
        mental_health_professional_id: id,
      });

      setExistingAvailabilities(availabilities);
      setIsLoading(false);
    }

    const mentalHealthProfessionalId = userDetails?.mental_health_professional?.id;

    if (dateRange && mentalHealthProfessionalId) {
      getAvailabilities(mentalHealthProfessionalId);
    }

  }, [dateRange, userDetails]);

  useEffect(() => {
    if(dateRange && existingAvailabilities) {
      groupAvailabilities(existingAvailabilities, dateRange);
    }
  }, [dateRange, existingAvailabilities]);

  const [calendarAppointments, setCalendarAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function getAppointmentsForCalendar(id: string,) {
      setIsLoading(true);

      const appointments = await fetchAppointments({
        appointment_date_from: dateRange?.start,
        appointment_date_to: dateRange?.end,
        mental_health_professional_id: id,
      }, 0);

      setCalendarAppointments(
        appointments?.appointments.filter((appointment) =>
          appointment.status === AppointmentStatusEnum.Booked) ?? []);
      setIsLoading(false);
    }

    const mentalHealthProfessionalId = userDetails?.mental_health_professional?.id;

    if (dateRange && mentalHealthProfessionalId) {
      getAppointmentsForCalendar(mentalHealthProfessionalId);
    }

  }, [dateRange, userDetails]);

  function groupAvailabilities(availabilities: Availability[] | null, rangeOfDate: DateRange) {
    const newAvailabilities: Availability[] | null = [];
    const weeksInMonth = getWeeksGivenRange(rangeOfDate.start, rangeOfDate.end).length;

    if (availabilities && availabilities.length > 0) {
      DAYS_OF_THE_WEEK.forEach((dayOfTheWeek) => {
        const filteredAvailabilities = availabilities
          ? availabilities.filter(
            (availability) =>
              availability.day_of_the_week === (dayOfTheWeek as string)
          )
          : [];
        filteredAvailabilities.forEach(
          (availability) => {
            if(userDetails) {
              const daysInWeek = 7;
              let date = rangeOfDate.start;
              for(let week = 0; week < weeksInMonth; week += 1) {
                const currentDate = moment(date).day(
                  DAYS_OF_THE_WEEK_MAPPING[dayOfTheWeek]
                ).toDate();
                const timeStart = availability.start_time.split(':');
                const timeEnd = availability.end_time.split(':');
                const formattedStart = formateDateToInternationalFormat(currentDate) + 'T'
                + timeStart[0] +':'+ timeStart[1];
                const formattedEnd = formateDateToInternationalFormat(currentDate) + 'T'
                + timeEnd[0] +':'+ timeEnd[1];
                const newDateStart = new Date(formattedStart);
                const newDateEnd = new Date(formattedEnd);

                const newAvailability = {
                  created_at: newDateStart.toString(),
                  day_of_the_week: AvailabilityDayOfTheWeekEnum[dayOfTheWeek],
                  deleted_at: newDateEnd.toString(),
                  end_time: newDateEnd.toString(),
                  id: availability.id,
                  isReadOnly: true,
                  mental_health_professional: userDetails.mental_health_professional,
                  start_time: newDateStart.toString(),
                  updated_at: newDateStart.toString(),
                };
                newAvailabilities.push(newAvailability);
                date = moment(date).add(daysInWeek, 'days').toDate();
              }
            }
          }
        );
      });
      setCurrentAvailabilities(newAvailabilities);
    }
  }

  function handleDateRangeChange(newDateRange: DateRange) {
    setDateRange({ ...newDateRange });
  }

  function checkAvailability(start: number, end: number) {
    let appointmentLink = '';
    const availabilityIsBooked = calendarAppointments.some(
      (appointment) => {
        if(start <= Date.parse(appointment.start) && end >= Date.parse(appointment.end)) {
          console.log('Availability: ', new Date(start), new Date(end));
          console.log('Appointment: ', new Date(appointment.start), new Date(appointment.end));
          console.log('Appointment_ID: ', appointment.id);
        }
        appointmentLink = appointment.id;

        return start <= Date.parse(appointment.start) && end >= Date.parse(appointment.end);
      }
    );
    const ref = '/appointments/' + appointmentLink;

    return availabilityIsBooked? ref : 'Available';
  }

  const calendarData = currentAvailabilities?.map((availability: Availability) => ({
    body: checkAvailability(Date.parse(availability.start_time), Date.parse(availability.end_time)),
    category: Category.TIME,
    end: availability.end_time,
    id: availability.id,
    start: availability.start_time,
  }));

  const loader = isLoading && <SitewideLoader />;

  return (
    <>
      {loader}
      <EmpathCalendar
        editSchedule={editSchedule}
        isReadOnly={true}
        schedules={calendarData}
        onDateRangeChange={handleDateRangeChange}
        onEditSchedule={onEditSchedule}
      />
    </>
  );
}
