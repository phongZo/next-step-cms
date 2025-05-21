import React from 'react';

import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import AvatarField from '@components/common/form/AvatarField';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';

import { UserOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { FieldTypes } from '@constants/formConfig';

const AdminListPage = ({ pageOptions }) => {
    const translate = useTranslate();

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.account,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(pageOptions.objectName)?.toLowerCase(),
        },
    });

    const columns = [
        {
            title: '#',
            width: '30px',
            align: 'center',
            render: (text, record, index) => index + 1,
        },
        {
            title: translate.formatMessage(commonMessage.avatar),
            dataIndex: 'avatarPath',
            align: 'center',
            render: (avatar) => (
                <AvatarField
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
                />
            ),
            width: '30px',
        },
        {
            title: translate.formatMessage(commonMessage.username),
            dataIndex: 'username',
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.fullName),
            dataIndex: 'fullName',
        },
        {
            title: translate.formatMessage(commonMessage.email),
            dataIndex: 'email',
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.phone),
            dataIndex: 'phone',
            width: '120px',
        },
        mixinFuncs.renderActionColumn(
            {
                edit: mixinFuncs.hasPermission([apiConfig?.account?.updateAdmin?.permissionCode]),
                delete: (record) =>
                    mixinFuncs.hasPermission([apiConfig?.account?.delete?.permissionCode]) && !record.isSuperAdmin,
            },
            { width: '120px' },
        ),
    ];

    const searchFields = [
        {
            key: 'fullName',
            placeholder: translate.formatMessage(commonMessage.fullName),
        },
        {
            key: 'phone',
            placeholder: translate.formatMessage(commonMessage.phone),
            type: FieldTypes.NUMBER,
        },
        {
            key: 'email',
            placeholder: translate.formatMessage(commonMessage.email),
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(commonMessage, translate)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                        onRow={(record, index) => ({
                            style: { backgroundColor: index % 2 === 1 ? '#fefefe' : '#ffffff' },
                        })}
                        locale={{ emptyText: <Empty description={translate.formatMessage(commonMessage.noData)} /> }}
                    />
                }
            />
        </PageWrapper>
    );
};

export default AdminListPage;
