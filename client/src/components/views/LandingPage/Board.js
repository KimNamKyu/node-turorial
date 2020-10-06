import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Table, Button, Modal } from 'antd';
import { useDispatch } from 'react-redux'
import { boardlist, boardsave } from '../../../_actions/board_action'

function Board(props) {
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([])

    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    useEffect(() => {
        dispatch(boardlist()).then(response => {
            setDataSource(response.payload)
        })
    }, [dataSource])
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

    const onSubmitHandler = (e) => {

        let date = new Date()
        let year = date.getFullYear().toString()
        let month = date.getMonth().toString()
        let day = date.getDate().toString()

        let reg_date = `${year}-${month.padStart('2',0)}-${day.padStart('2',0)}`
        
        e.preventDefault();
        let body = {
            title: title,
            contents: contents,
            author: dataSource[0].author,
            reg_date: reg_date
        }
        dispatch(boardsave(body))
            .then(response => {
                console.log(response)
            })
        setVisible(false)
        console.log(dataSource)
    }

    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    const onContentHandler = (e) => {
        setContents(e.currentTarget.value)
    }
    return (
        <div style={{ width: '85%', paddingTop: '100px', margin: '0 auto' }}>
            <h1>게시판</h1>
            <div>
                <Button type="primary" onClick={() => setVisible(true)}>
                    글작성
                </Button>
                <Modal
                    title="글작성"
                    centered
                    visible={visible}
                    // onOk={() => setVisible(false)}
                    onOk={onSubmitHandler}
                    onCancel={() => setVisible(false)}
                    width={600}
                    okText="저장"
                    cancelText="취소"
                >
                    <form onSubmit={onSubmitHandler}
                        style={{display:'flex', flexDirection:'column'}}
                    >
                        <label>제목</label>
                        <input type="text" value={title} onChange={onTitleHandler}/>
                        <label>내용</label>
                        <textarea type="textArea" rows='3' cols='50' value={contents} onChange={onContentHandler}/>
                    </form>
                </Modal>

            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
            />
        </div >
    )
}

export default withRouter(Board)