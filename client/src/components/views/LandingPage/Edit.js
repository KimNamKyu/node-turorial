import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux'

function Edit(props) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Open Modal of 1000px width
      </Button>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={600}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
}

export default withRouter(Edit)