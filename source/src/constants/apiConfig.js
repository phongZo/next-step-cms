import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    account: {
        login: {
            baseURL: `${apiUrl}v1/account/login`,
            method: 'POST',
            headers: baseHeader,
        },
        loginBasic: {
            baseURL: `${apiUrl}api/token`,
            method: 'POST',
            headers: baseHeader,
        },
        loginSSO: {
            baseURL: `${apiUrl}v1/account/login-sso`,
            method: 'POST',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/account/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update_profile_admin`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'ACC_U_PROFILE_AD',
        },
        refreshToken: {
            baseURL: `${apiUrl}v1/account/refresh_token`,
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
        changePassword: {
            baseURL: `${apiUrl}v1/account/change-password`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        createAdmin: {
            baseURL: `${apiUrl}v1/account/create_admin`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'ACC_C_AD',
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'ACC_D',
        },
        forgetPassword: {
            baseURL: `${apiUrl}v1/account/forget-password`,
            method: 'POST',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'ACC_V',
        },
        profile: {
            baseURL: `${apiUrl}v1/account/profile`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'ACC_V',
        },
        requestForgetPassword: {
            baseURL: `${apiUrl}v1/account/request-forget-password`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'ACC_C',
        },
        updateAdmin: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'ACC_U_AD',
        },
        getList: {
            baseURL: `${apiUrl}v1/account/list-admin`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'ACC_L',
        },
    },
    user: {
        getList: {
            baseURL: `${apiUrl}v1/account/list`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'ACC_L',
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/account/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'ACC_V',
        },
        create: {
            baseURL: `${apiUrl}v1/account/create_admin`,
            method: `POST`,
            headers: baseHeader,
            permissionCode: 'ACC_C_AD',
        },
        update: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: `PUT`,
            headers: baseHeader,
            permissionCode: 'ACC_U_AD',
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
            permissionCode: 'ACC_D',
        },
        login: {
            baseURL: `${apiUrl}v1/account/login`,
            method: `POST`,
            headers: baseHeader,
        },
        signup: {
            baseURL: `${apiUrl}v1/account/login`,
            method: `POST`,
            headers: baseHeader,
        },
    },
    file: {
        upload: {
            path: `${apiUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
            isRequiredTenantId: true,
            isUpload: true,
            permissionCode: 'FILE_U',
        },
    },
    post: {
        getList: {
            baseURL: `${apiUrl}api/post/list`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'POST_L',
        },
        getById: {
            baseURL: `${apiUrl}api/post/get/:id`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'POST_V',
        },
        create: {
            baseURL: `${apiUrl}api/post/create`,
            method: `POST`,
            headers: baseHeader,
            permissionCode: 'POST_C',
        },
        update: {
            baseURL: `${apiUrl}api/post/update`,
            method: `PUT`,
            headers: baseHeader,
            permissionCode: 'POST_U',
        },
        delete: {
            baseURL: `${apiUrl}api/post/:id`,
            method: `DELETE`,
            headers: baseHeader,
            permissionCode: 'POST_D',
        },
        getClientList: {
            baseURL: `${apiUrl}api/post/client-list`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'POST_L',
        },
        getClientById: {
            baseURL: `${apiUrl}api/post/client-get/:id`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'POST_V',
        },
    },
    category: {
        getList: {
            baseURL: `${apiUrl}v1/category/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CA_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CA_V',
        },
        create: {
            baseURL: `${apiUrl}v1/category/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'CA_C',
        },
        update: {
            baseURL: `${apiUrl}v1/category/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'CA_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'CA_D',
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/category/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    groupPermission: {
        getGroupList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'GR_L',
        },
        getList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'GR_L',
        },
        getPemissionList: {
            baseURL: `${apiUrl}v1/permission/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'PER_L',
        },
        getPemissionListByApp: {
            baseURL: `${apiUrl}v1/project-role-permission/list-by-app`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'PRP_L_A',
        },
        getById: {
            baseURL: `${apiUrl}v1/group/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'GR_V',
        },
        create: {
            baseURL: `${apiUrl}v1/group/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'GR_C',
        },
        update: {
            baseURL: `${apiUrl}v1/group/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'GR_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getGroupListCombobox: {
            baseURL: `${apiUrl}v1/group/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    news: {
        getList: {
            baseURL: `${apiUrl}v1/news/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'NEWS_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/news/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'NEWS_V',
        },
        create: {
            baseURL: `${apiUrl}v1/news/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'NEWS_C',
        },
        update: {
            baseURL: `${apiUrl}v1/news/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'NEWS_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/news/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'NEWS_D',
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/news/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            permissonCode: 'NEWS_V',
        },
    },
    settings: {
        getList: {
            baseURL: `${apiUrl}v1/setting/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
            permissionCode: 'SET_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/setting/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
            permissionCode: 'SET_V',
        },
        create: {
            baseURL: `${apiUrl}v1/setting/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
            permissionCode: 'SET_C',
        },
        update: {
            baseURL: `${apiUrl}v1/setting/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
            permissionCode: 'SET_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/setting/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
            permissionCode: 'SET_D',
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/setting/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        settings: {
            baseURL: `${apiUrl}v1/setting/settings`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    candidate: {
        getList: {
            baseURL: `${apiUrl}v1/candidate/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CA_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/candidate/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CA_V',
        },
        signup: {
            baseURL: `${apiUrl}v1/candidate/signup`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'CA_C',
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/candidate/update-profile`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'CA_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/candidate/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'CA_D',
        },
        profile: {
            baseURL: `${apiUrl}v1/candidate/profile`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CA_V',
        },
    },
    company: {
        getList: {
            baseURL: `${apiUrl}v1/company/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CO_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/company/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CO_V',
        },
        create: {
            baseURL: `${apiUrl}v1/company/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'CO_C',
        },
        update: {
            baseURL: `${apiUrl}v1/company/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'CO_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/company/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'CO_D',
        },
    },
    employee: {
        getList: {
            baseURL: `${apiUrl}v1/employee/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'EM_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/employee/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'EM_V',
        },
        create: {
            baseURL: `${apiUrl}v1/employee/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'EM_C',
        },
        update: {
            baseURL: `${apiUrl}v1/employee/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'EM_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/employee/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'EM_D',
        },
    },
    nation: {
        getList: {
            baseURL: `${apiUrl}v1/nation/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'NATION_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/nation/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'NATION_V',
        },
        create: {
            baseURL: `${apiUrl}v1/nation/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'NATION_C',
        },
        update: {
            baseURL: `${apiUrl}v1/nation/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'NATION_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/nation/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'NATION_D',
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/nation/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'NATION_A',
        },
    },
};

export default apiConfig;
