import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import CandidateListPage from '@modules/candidate';
import CandidateSavePage from '@modules/candidate/CandidateSavePage';

const paths = {
    candidateListPage: '/candidates',
    candidateSavePage: '/candidates/:id',
};

export default {
    candidateListPage: {
        path: paths.candidateListPage,
        auth: true,
        component: CandidateListPage,
        permissions: [apiConfig.candidate.getList.permissionCode],
        pageOptions: {
            objectName: commonMessage.candidate,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.candidate) }];
            },
        },
    },
    candidateSavePage: {
        path: paths.candidateSavePage,
        auth: true,
        component: CandidateSavePage,
        separateCheck: true,
        permissions: [apiConfig.candidate.getById.permissionCode, apiConfig.candidate.updateProfile.permissionCode],
        pageOptions: {
            objectName: commonMessage.candidate,
            listPageUrl: paths.candidateListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.candidate), path: paths.candidateListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
