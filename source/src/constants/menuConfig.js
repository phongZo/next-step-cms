import React from 'react';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';
import { IconArticle, IconSettings } from '@tabler/icons-react';
import apiConfig from '@constants/apiConfig';
import { UsergroupAddOutlined } from '@ant-design/icons';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý tài khoản" />,
        key: 'quan-ly-tai-khoan',
        icon: <UsergroupAddOutlined size={16} />,
        permission: apiConfig.account.getList.permissionCode,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quản trị viên" />,
                key: 'admins',
                path: routes.adminListPage.path,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý hệ thống" />,
        key: 'quan-ly-he-thong',
        icon: <IconSettings size={16} />,
        permission: apiConfig.groupPermission.getList.permissionCode,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quyền" />,
                key: 'group-permission',
                path: routes.groupPermissionPage.path,
            },
        ],
    },

    {
        label: <FormattedMessage defaultMessage="Tin tức" />,
        key: 'tin-tuc',
        icon: <IconArticle stroke={2} size={16} />,
        permission: apiConfig.news.getList.permissionCode,
        children: [
            {
                label: <FormattedMessage defaultMessage="Danh sách tin tức" />,
                key: 'news',
                path: routes.newsListPage.path,
            },
        ],
    },
];
