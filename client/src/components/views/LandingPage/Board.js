import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { useDispatch } from 'react-redux'
import { boardlist } from '../../../_actions/board_action'
const columns = [
    {
        title: 'No',
    },
    {
        title: 'title',
    },
    {
        title: 'contents',
    },
    {
        title: 'author',
    },
];

function Board(props) {
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        dispatch(boardlist()).then(response => {
            setDataSource(response.payload)
        })
    }, [])

    console.log(dataSource)
    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'contents',
            dataIndex: 'contents',
            key: 'contents',
        },
        {
            title: 'author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'reg_date',
            dataIndex: 'reg_date',
            key: 'reg_date',
        },
    ]


    return (
        <div style={{ width: '85%', paddingTop: '100px', margin: '0 auto' }}>
            <h1>게시판</h1>
            <div>
                <a href={'/Edit'}>글작성</a>
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    )
}

export default withRouter(Board)