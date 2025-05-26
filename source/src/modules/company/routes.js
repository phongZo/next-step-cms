import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import CompanyListPage from '@modules/company';
import CompanySavePage from '@modules/company/CompanySavePage';

const paths = {
    companyListPage: '/company',
    companySavePage: '/company/:id',
};

export default {
    companyListPage: {
        path: paths.companyListPage,
        auth: true,
        component: CompanyListPage,
        permissions: [apiConfig.company.getList.permissionCode],
        pageOptions: {
            objectName: commonMessage.company,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.company) }];
            },
        },
    },
    companySavePage: {
        path: paths.companySavePage,
        auth: true,
        component: CompanySavePage,
        separateCheck: true,
        permissions: [apiConfig.company.getById.permissionCode, apiConfig.company.update.permissionCode],
        pageOptions: {
            objectName: commonMessage.company,
            listPageUrl: paths.companyListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.company), path: paths.companyListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
