import './Home.scss';

import { clientActions } from '../../actions';
import { useInterval } from '../../utils';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import { Layout, Menu, Breadcrumb, Icon, Card, Avatar, Row, Col } from 'antd';

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function Home() {
  /*   const filter = useSelector(state => state.filter);
  const rows = useSelector(state => state.rows); */
  let [count, setCount] = useState(0);

  const clients = useSelector(state => state.clients);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Device name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name > b.name
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      sorter: (a, b) => a.ip - b.ip
    },
    {
      title: 'Download',
      dataIndex: 'download',
      key: 'download',
      sorter: (a, b) => a.download - b.download
    },
    {
      title: 'Upload',
      dataIndex: 'upload',
      key: 'upload',
      sorter: (a, b) => a.upload - b.upload
    }
  ];

  //var data = [{ key: 1, name: 'Facu-PC (Dummy)', ip: '192.168.0.197', download: '5 mb/s', upload: '1.5 mb/s' }];
  const data = clients => {
    if (typeof clients === 'undefined') return null;

    return clients.map((c, index) => {
      const download = c.download.toFixed(2) > 1024 ? `${(c.download/1024).toFixed(2)} MB/s` : `${c.download.toFixed(2)} KB/s`;

      const upload = c.upload.toFixed(2) > 1024 ? `${(c.upload/1024).toFixed(2)} MB/s` : `${c.upload.toFixed(2)} KB/s`;

      return { key: index, name: c.deviceName, ip: c.ip, download, upload};
    });
  };

  const cardStyle = {
    textAlign: 'center'
  };

  useInterval(() => {
    setCount(count + 1);
    //console.log(clients.timeout);
    dispatch(clientActions.showClients());
  }, clients.timeout);

  useEffect(() => {
    console.log('Home - useEffect');
  }, []);

  function onChange(pagination, filters, sorter) {
    // console.log('params', pagination, filters, sorter);
  }

  return (
    <Content style={{}}>
      <Row gutter={0}>
        <Table
          pagination={{
            showTotal: (total, range) => {
              return `${range[0]}-${range[1]} of ${total} devices`;
            },
            position: 'bottom',
            pageSize: 10
          }}
          columns={columns}
          dataSource={data(clients.data)}
          onChange={onChange}
        />
      </Row>
    </Content>
  );
}
