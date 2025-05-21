import React from 'react';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';
import { IconSettings } from '@tabler/icons-react';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý hệ thống" />,
        key: 'quan-ly-he-thong',
        icon: <IconSettings size={16} />,
        // permission: apiConfig.category.getList.baseURL,
        children: [
            // {
            //     label: <FormattedMessage defaultMessage="Cài đặt" />,
            //     key: 'setting',
            //     path: routes.settingsPage.path,
            // },
            {
                label: <FormattedMessage defaultMessage="Quản trị viên" />,
                key: 'admins',
                path: routes.adminListPage.path,
            },
            {
                label: <FormattedMessage defaultMessage="Quyền" />,
                key: 'group-permission',
                path: routes.groupPermissionPage.path,
            },
        ],
    },
];
