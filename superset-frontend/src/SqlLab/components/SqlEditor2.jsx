import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rison from 'rison';
import PropTypes from 'prop-types';
import { SupersetClient, t } from '@superset-ui/core';
import { Collapse, ListGroup, ListGroupItem } from 'react-bootstrap';

import DatabaseItem from './DatabaseItem';

const propTypes = {
    databases: PropTypes.object,
}

const defaultProps = {
    databases: null,
}

class SqlEditor2 extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const items = Object.keys(this.props.databases).map(db => {
            const db_name =
                this.props.databases[db].database_name;
            const db_id = this.props.databases[db].explore_database_id;
            return (<DatabaseItem
                db_id={db_id}
                db_name={db_name} />);
        });
        return (
            <ListGroup>
                {items}
            </ListGroup>
        )
    }
}
SqlEditor2.defaultProps = defaultProps;
SqlEditor2.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const queryEditor = sqlLab.queryEditors.find(
        editor => editor.id === props.queryEditorId,
    );

    return { sqlLab, ...props, queryEditor };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
        },
        dispatch,
    );
}

export default connect(null, null)(SqlEditor2);