import React, { useState } from 'react';

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
import { Button, Empty, Tag } from 'antd';
import { FieldTypes } from '@constants/formConfig';
import { BaseTooltip } from '@components/common/form/BaseTooltip';
import { IconProgressAlert } from '@tabler/icons-react';
import useFetch from '@hooks/useFetch';
import useDisclosure from '@hooks/useDisclosure';
import ChangeStatusModal from '@modules/candidate/ChangeStatusModal';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { defineMessage } from 'react-intl';
import { candidateStatusOptions } from '@constants/masterData';

const message = defineMessage({
    changeStatusSuccess: {
        id: 'modules.candidate.changeStatus.success',
        defaultMessage: 'Change status successfully',
    },
    changeStatusError: {
        id: 'modules.candidate.changeStatus.error',
        defaultMessage: 'Change status failed',
    },
});

const CandidateListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const [isOpen, { open, close }] = useDisclosure(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const { data, mixinFuncs, queryFilter, loading, pagination, setData } = useListBase({
        apiConfig: apiConfig.candidate,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(pageOptions.objectName)?.toLowerCase(),
        },
        override: (funcs) => {
            funcs.additionalActionColumnButtons = () => ({
                changeStatus: (dataRow) => {
                    return (
                        <BaseTooltip
                            title={translate.formatMessage(commonMessage.status)}
                            objectName={translate.formatMessage(pageOptions.objectName)}
                        >
                            <Button
                                type="link"
                                style={{ padding: 0, cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRecord(dataRow);
                                    open();
                                }}
                            >
                                <IconProgressAlert size={20} />
                            </Button>
                        </BaseTooltip>
                    );
                },
            });
        },
    });

    const { execute: executeChangeStatus } = useFetch(apiConfig.candidate.changeStatus);

    const handleChangeStatus = async (value) => {
        if (!selectedRecord) return;

        const body = {
            id: selectedRecord.id,
            status: value.status,
        };

        executeChangeStatus({
            data: body,
            onCompleted: () => {
                showSucsessMessage(translate.formatMessage(message.changeStatusSuccess), translate);
                close();
                setSelectedRecord(null);
                const updatedData = data.map((item) =>
                    item.id === selectedRecord.id ? { ...item, status: value.status } : item,
                );
                setData(updatedData);
            },
            onError: (err) => {
                console.error('Error changing status:', err);
                showErrorMessage(translate.formatMessage(message.changeStatusError), translate);
            },
        });
    };

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
            title: translate.formatMessage(commonMessage.fullName),
            dataIndex: ['account', 'fullName'],
        },
        {
            title: translate.formatMessage(commonMessage.email),
            dataIndex: ['account', 'email'],
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.phone),
            dataIndex: ['account', 'phone'],
            width: '120px',
        },
        {
            title: translate.formatMessage(commonMessage.jobTitle),
            dataIndex: ['jobTitle'],
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.status),
            width: '100px',
            render: (record) => {
                const statusColor =
                    candidateStatusOptions.find((item) => item.value === record.status)?.color || '#108ee9';

                return (
                    <Tag color={statusColor}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>
                            {translate.formatMessage(
                                candidateStatusOptions.find((item) => item.value === record.status).label,
                            )}
                        </div>
                    </Tag>
                );
            },
        },
        mixinFuncs.renderActionColumn(
            {
                changeStatus: mixinFuncs.hasPermission([apiConfig?.candidate?.changeStatus?.permissionCode]),
            },
            { width: 120 },
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
        {
            key: 'jobTitle',
            placeholder: translate.formatMessage(commonMessage.jobTitle),
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(commonMessage, translate)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
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
            <ChangeStatusModal
                open={isOpen}
                onOk={handleChangeStatus}
                onCancel={close}
                initialValues={{ status: selectedRecord?.status }}
            />
        </PageWrapper>
    );
};

export default CandidateListPage;
