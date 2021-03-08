import React from 'react';
import { connect } from 'react-redux';
import { t, styled, css } from '@superset-ui/core';
import { ListGroup } from 'react-bootstrap';
import Collapse from 'src/common/components/Collapse';
import PropTypes from 'prop-types';

import DatabaseItem from './DatabaseItem';
import TableElement from './TableElement';

const propTypes = {
    actions: PropTypes.object,
    databases: PropTypes.object,
    table: PropTypes.object,
    queryEditor: PropTypes.object,
}

const defaultProps = {
    actions: {},
    databases: null,
    table: null,
    queryEditor: null,
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
                <ListGroup>
                    {items}
                </ListGroup>
                {this.props.table && (
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
                )}
            </>
        )
    }
}
SqlEditorLeftBar2.defaultProps = defaultProps;
SqlEditorLeftBar2.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const table = sqlLab.tableMetadata;

    return { sqlLab, ...props, table };
}

export default connect(mapStateToProps, null)(SqlEditorLeftBar2);