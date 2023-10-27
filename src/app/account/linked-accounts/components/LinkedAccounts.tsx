'use client'
import React from 'react'
import Panel from '../../components/Panel'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, CardBody } from '@nextui-org/react'
import Google from '@/components/svg/Google'
import Facebook from '@/components/svg/Facebook'
import Github from '@/components/svg/Github'
import LinkedAccountToggle from './LinkedAccountToggle'

export default function LinkedAccounts() {
  const providers: { id: 'facebook.com' | 'github.com' | 'google.com'; icon: React.ReactNode }[] = [
    {
      id: 'google.com',
      icon: <Google width="1.5rem" height="1.5rem" />,
    },
    {
      id: 'facebook.com',
      icon: <Facebook width="1.5rem" height="1.5rem" />,
    },
    {
      id: 'github.com',
      icon: <Github width="1.5rem" height="1.5rem" />,
    },
  ]

  return (
    <Panel title="Linked Accounts" className="lg:max-w-3xl">
      <CardBody>
        <Table removeWrapper hideHeader>
          <TableHeader>
            <TableColumn>Icon</TableColumn>
            <TableColumn>Provider</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="w-14">{provider.icon}</TableCell>
                <TableCell className="capitalize">{provider.id.split('.')[0]}</TableCell>
                <TableCell className="text-right">
                  <LinkedAccountToggle id={provider.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Panel>
  )
}
