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

const CompanyListPage = ({ pageOptions }) => {
    const translate = useTranslate();

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.company,
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
            title: translate.formatMessage(commonMessage.logo),
            dataIndex: 'logo',
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
            title: translate.formatMessage(commonMessage.companyName),
            dataIndex: 'name',
        },
        {
            title: translate.formatMessage(commonMessage.hotline),
            dataIndex: 'hotline',
            width: '150px',
        },
        mixinFuncs.renderActionColumn(
            {
                edit: mixinFuncs.hasPermission([apiConfig?.company?.update?.permissionCode]),
                delete: mixinFuncs.hasPermission([apiConfig?.company?.delete?.permissionCode]),
            },
            { width: '120px' },
        ),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.companyName),
        },
        {
            key: 'hotline',
            placeholder: translate.formatMessage(commonMessage.hotline),
            type: FieldTypes.NUMBER,
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

export default CompanyListPage;
