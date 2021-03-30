import React from 'react';
import { connect } from 'react-redux';
import rison from 'rison';
import { t, styled, css, SupersetClient } from '@superset-ui/core';
import { ListGroup } from 'react-bootstrap';
import Collapse from 'src/common/components/Collapse';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import DatabaseItem from './DatabaseItem';
import TableElement from './TableElement';

const propTypes = {
    actions: PropTypes.object,
    databases: PropTypes.object,
    height: PropTypes.number,
    queryEditor: PropTypes.object,
    table: PropTypes.object,
    tableLoading: PropTypes.bool
}

const defaultProps = {
    actions: {},
    databases: null,
    height: 500,
    queryEditor: null,
    table: null,
    tableLoading: false,
}

const StyledScrollbarContainer = styled.div`
  flex: 1 1 auto;
  overflow: auto;
`;

const StyledScrollbarContent = styled.div`
  height: ${props => props.contentHeight}px;
`;

class SqlEditorLeftBar2 extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("SqlEditorLeftBar2 componentDidMount");
        const queryParams = rison.encode({
            order_columns: 'database_name',
            order_direction: 'asc',
            page: 0,
            page_size: -1,
        });
        const endpoint = encodeURI(`/api/v1/database/?q=${queryParams}`);
        SupersetClient.get({ endpoint })
            .then(({ json }) => {
                console.log("Load databases");
                console.log(json);
                this.props.actions.setDatabases(json.result);
            })
            .catch(() => {
                console.log('Error while fetching database list');
            });
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
        const tableMetaDataHeight = this.props.height - 130; // 130 is the height of the selects above
        return (
            <>
                <StyledScrollbarContainer>
                    <StyledScrollbarContent contentHeight={tableMetaDataHeight}>
                        <ListGroup>
                            {items}
                        </ListGroup>
                    </StyledScrollbarContent>
                </StyledScrollbarContainer>
                {this.props.tableLoading &&
                    <div
                        style={{
                            width: "100%",
                            height: "100",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />
                    </div>}
                {this.props.table && !this.props.tableLoading &&
                    <>
                        <div className="divider" />
                        <StyledScrollbarContainer>
                            <StyledScrollbarContent contentHeight={tableMetaDataHeight}>
                                <Collapse
                                    ghost
                                    expandIconPosition="right"
                                    css={theme => css`
                                       .ant-collapse-item {
                                         margin-bottom: ${theme.gridUnit * 3}px;
                                       }
                                       .ant-collapse-header {
                                         padding: 0px !important;
                                         display: flex;
                                         align-items: center;
                                       }
                                       .ant-collapse-content-box {
                                         padding: 0px ${theme.gridUnit * 4}px 0px 0px !important;
                                       }
                                       .ant-collapse-arrow {
                                         top: ${theme.gridUnit * 2}px !important;
                                         color: ${theme.colors.primary.dark1} !important;
                                         &: hover {
                                           color: ${theme.colors.primary.dark2} !important;
                                       }
                                     }
                                  `}
                                >
                                    <TableElement
                                        table={this.props.table}
                                        key={this.props.table.id}
                                        actions={this.props.actions}
                                    />
                                </Collapse>
                            </StyledScrollbarContent>
                        </StyledScrollbarContainer>
                    </>
                }
            </>
        )
    }
}
SqlEditorLeftBar2.defaultProps = defaultProps;
SqlEditorLeftBar2.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const table = sqlLab.tableMetadata;
    const tableLoading = sqlLab.tableMetadataLoading;

    return { sqlLab, ...props, table, tableLoading };
}

export default connect(mapStateToProps, null)(SqlEditorLeftBar2);