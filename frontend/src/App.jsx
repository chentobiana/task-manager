import React, { useState } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { HEADER_TITLE, FOOTER_TEXT } from './constants';
import { StateProvider } from './StateProvider';

const { Header, Content, Footer } = Layout;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <StateProvider>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">{HEADER_TITLE}</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 16 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <TaskFilter />
            <TaskList />
            <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Task</Button>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{FOOTER_TEXT}</Footer>

        <Modal 
          title="Add a New Task" 
          visible={isModalVisible} 
          onCancel={() => setIsModalVisible(false)} 
          footer={null}
        >
          <AddTaskForm setIsModalVisible={setIsModalVisible} />
        </Modal>
      </Layout>
    </StateProvider>
  );
}

export default App;
