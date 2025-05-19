import React from 'react';
import { UsergroupAddOutlined, ControlOutlined, InboxOutlined } from '@ant-design/icons';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';
import apiConfig from './apiConfig';
import { IconSettings } from '@tabler/icons-react';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý hệ thống" />,
        key: 'quan-ly-he-thong',
        icon: <IconSettings size={16} />,
        // permission: apiConfig.category.getList.baseURL,
        children: [
            {
                label: <FormattedMessage defaultMessage="Cài đặt" />,
                key: 'setting',
                path: routes.settingsPage.path,
            },
        ],
    },
];
