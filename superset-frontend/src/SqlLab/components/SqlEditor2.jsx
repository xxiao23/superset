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

// function DatabaseItem(props) {
//     const [open, setOpen] = useState(false);
//     console.log('DatabaseItem props:');
//     console.log(props);
//     // const schema_divs = props.schemas.map(schema => <div>{schema.value}</div>);
//     const schema_divs = (<div>whatever</div>);

//     return (
//         <>
//             <ListGroupItem action onClick={() => {
//                 console.log(open);
//                 setOpen(!open);
//                 // fetchSchemas(db_id, db_name);
//             }}>
//                 {props.db_name}
//             </ListGroupItem>
//             <Collapse in={open}>
//                 {schema_divs}     
//             </Collapse>
//         </>
//     );
// }

class SqlEditor2 extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    // fetchSchemas(databaseId, databaseName) {
    //     const queryParams = rison.encode({
    //         force: true,
    //     });
    //     const endpoint = `/api/v1/database/${databaseId}/schemas/?q=${queryParams}`;
    //     return SupersetClient.get({ endpoint })
    //         .then(({ json }) => {
    //             const options = json.result.map((s) => ({
    //                 value: s,
    //                 label: s,
    //                 title: s,
    //             }));
    //             console.log(databaseName);
    //             console.log('schemas:');
    //             console.log(options);
    //         })
    //         .then(schemas => this.setState({schemas}))
    //             // this.setState(prevState => {
    //             //     const newSchemas = [...prevState.schemas];
    //             //     newSchemas[databaseId] = options;
    //             //     return { schemas: newSchemas };
    //             // }))
    //         .catch(() => {
    //             console.log(t('Error while fetching schema list'));
    //         });
    // }

    // componentDidMount() {
    //     Object.keys(this.props.databases).map(db => {
    //         const db_name =
    //             this.props.databases[db].database_name;
    //         const db_id = this.props.databases[db].explore_database_id;
    //         console.log("fetch schemas for " + db_name);
    //         this.fetchSchemas(db_id, db_name);
    //     });
    // }

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