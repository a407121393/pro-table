import React from 'react';
import { Button, Icon, Tag } from 'antd';
// eslint-disable-next-line import/no-unresolved
import ProTable, { ProColumns, TableDropdown } from '../../src';
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'umi-request';

interface GithubIssueItem {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  body: string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    width: 200,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    valueEnum: {
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 80,
    render: (_, row) =>
      row.labels.map(({ name, id, color }) => (
        <Tag
          color={`#${color}`}
          key={id}
          style={{
            margin: 4,
          }}
        >
          {name}
        </Tag>
      )),
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row, index, action) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <a
        onClick={() => {
          window.alert('确认关闭吗?');
          action.reload();
        }}
      >
        关闭
      </a>,
      <TableDropdown
        onSelect={key => window.alert(key)}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async (params = {}) => {
      const data = await request<GithubIssueItem[]>(
        'https://api.github.com/repos/ant-design/ant-design-pro/issues',
        {
          params: {
            ...params,
            page: params.current,
            per_page: params.pageSize,
          },
        },
      );
      return {
        data,
        page: params.current,
        success: true,
        total: 5713,
      };
    }}
    rowKey="id"
    momentFormat="string"
    headerTitle="查询 Table"
    params={{ state: 'all' }}
    toolBarRender={action => [
      <Button
        key="3"
        onClick={() => {
          action.resetPageIndex();
        }}
        type="primary"
      >
        <Icon type="plus" />
        新建
      </Button>,
    ]}
  />
);
