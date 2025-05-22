import React from 'react';
import { Tooltip } from 'antd';
import { defineMessage, useIntl } from 'react-intl';

const message = defineMessage({
    edit: {
        id: 'components.common.elements.form.BaseTooltip.edit',
        defaultMessage: 'Sửa {objectName}',
    },
    delete: {
        id: 'components.common.elements.form.BaseTooltip.delete',
        defaultMessage: 'Xóa {objectName}',
    },
});

export const BaseTooltip = ({
    placement = 'bottom',
    type,
    objectName = '',
    title,
    toLowerCase = true,
    children,
    ...props
}) => {
    const intl = useIntl();
    if (toLowerCase) {
        objectName = objectName.toLowerCase();
    }
    const titleMapping = {
        edit: intl.formatMessage(message.edit, { objectName }),
        delete: intl.formatMessage(message.delete, { objectName }),
    };

    title = titleMapping[type] || title;
    return (
        <Tooltip placement={placement} title={title} {...props}>
            {children}
        </Tooltip>
    );
};
