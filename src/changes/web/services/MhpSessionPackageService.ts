// import { CreateMhpSessionPackageDto, MhpSessionPackageApi, UpdateOrganizationSessionPackageDto } from '@empath/api-lib';

/*
 * import ApiClient from 'api-client';
 * import StatusAlert, { Status } from 'components/StatusAlert';
 * import { GetSessionPackageAvailed } from 'types/SessionPackageAvailed';
 * import { getDateEndOf, getDateStartOf } from 'utils/DateUtils';
 */

// const mhpSessionPackageApi = ApiClient.use(MhpSessionPackageApi);

/*
 * export async function createMhpSessionPackage(
 *   createMhpSessionPackageData: CreateMhpSessionPackageDto
 * ) {
 *   try {
 *     const { data } =
 *       await mhpSessionPackageApi.mhpSessionPackageControllerCreateMhpSessionPackage(
 *         createMhpSessionPackageData
 *       );
 */

/*
 *     return data;
 *   } catch (err) {
 *     StatusAlert({
 *       description:
 *         'An error occurred while create your package. Please make sure that your organization has remaining credits.',
 *       status: Status.ERROR,
 *     });
 */

/*
 *     return null;
 *   }
 * }
 */

/*
 * export async function getIndividualOrganizationCreditsDetails(id: string) {
 *   try {
 *     const { data } = await sessionPackageAvailedApi.sessionPackageAvailedControllerFindOne(id);
 */

/*
 *     return data;
 *   } catch (error) {
 *     StatusAlert({ description: 'An error was encountered while getting the organization credit details details. Please try again.', status: Status.ERROR });
 */

/*
 *     return null;
 *   }
 * }
 */

/*
 * export async function getSessionPackagesAvailed(filters: GetSessionPackageAvailed, limit?: number, page?: number) {
 *   try {
 *     const {
 *       availed_date_from,
 *       availed_date_to,
 *       organization_id,
 *       organization_name,
 *       session_package_id,
 *       session_package_name,
 *       search_in,
 *       search_query
 *     } = filters;
 *     const availedDate = formateAvailedDateFilter(availed_date_from, availed_date_to);
 *     const { data } = await sessionPackageAvailedApi.sessionPackageAvailedControllerGet(
 *       availedDate.from,
 *       availedDate.to,
 *       organization_id,
 *       organization_name,
 *       session_package_id,
 *       session_package_name,
 *       search_query,
 *       search_in,
 *       limit,
 *       page
 *     );
 */

/*
 *     return data;
 *   } catch (error) {
 *     StatusAlert({
 *       description: 'An error occurered while getting the list of packages availed. Please reload the page to try again.',
 *       status: Status.ERROR,
 *     });
 */

/*
 *     return null;
 *   }
 * }
 */

/*
 * export async function getSessionPackagesAvailedBasicInformation(
 *   filters: GetSessionPackageAvailed,
 *   limit?: number,
 *   page?: number
 * ) {
 *   try {
 *     const {
 *       availed_date_from,
 *       availed_date_to,
 *       organization_id,
 *       organization_name,
 *       session_package_id,
 *       session_package_name,
 *       search_in,
 *       search_query
 *     } = filters;
 *     const availedDate = formateAvailedDateFilter(availed_date_from, availed_date_to);
 *     const { data } = await sessionPackageAvailedApi.sessionPackageAvailedControllerGetBasicInformation(
 *       availedDate.from,
 *       availedDate.to,
 *       organization_id,
 *       organization_name,
 *       session_package_id,
 *       session_package_name,
 *       search_query,
 *       search_in,
 *       limit,
 *       page
 *     );
 */

/*
 *     return data;
 *   } catch (error) {
 *     StatusAlert({
 *       description: 'An error occurered while getting the list of packages availed. Please reload the page to try again.',
 *       status: Status.ERROR,
 *     });
 */

/*
 *     return null;
 *   }
 * }
 */

/*
 * export async function deleteSessionPackageAvailed(id: string) {
 *   try {
 *     const { data } = await sessionPackageAvailedApi.sessionPackageAvailedControllerDelete(id);
 */

/*
 *     return data;
 *   } catch (error) {
 *     StatusAlert({
 *       description: 'An error occurred while deleting the organization session availed. Please try again.',
 *       status: Status.ERROR
 *     });
 */

/*
 *     return null;
 *   }
 * }
 */

/*
 * export async function updateSessionPackageDetails(id: string, packageUpdateData: UpdateOrganizationSessionPackageDto) {
 *   try {
 *     const { data } = await sessionPackageAvailedApi.sessionPackageAvailedControllerUpdateSessionPackageDetails(
 *       id, packageUpdateData);
 */

/*
 *     return data;
 *   } catch (error) {
 *     StatusAlert({ description: 'An error was encountered while updating the package details. Please try again.', status: Status.ERROR });
 */

/*
 *     return null;
 *   }
 * }
 */

/*
 * function formateAvailedDateFilter(from?: Date, to?: Date) {
 *   return {
 *     from: getDateStartOf('day', from)?.toISOString(),
 *     to: getDateEndOf('day', to)?.toISOString(),
 *   };
 * }
 */
