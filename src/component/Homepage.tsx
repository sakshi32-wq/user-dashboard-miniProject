// src/routes/users.tsx
import {
    Table,
    Container,
    Title,
    Pagination,   
     Box,
    TextInput,
    Group,
    
  } from '@mantine/core';
  import { useQuery } from '@tanstack/react-query';
  import { fetchUsers } from '../api/api'; 
  import { useNavigate } from '@tanstack/react-router';
  import { useEffect, useState } from 'react';
  import type { User } from '../api/api'; 
  
  export default function UsersPage() {
    const { data = []} = useQuery<User[]>({
      queryKey: ['users'],
      queryFn: fetchUsers,
    });
  
    const page_size=5;
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();    
  
    useEffect(() => {
        const timer = setTimeout(() => {
          setSearch(input);
        }, 300);
    
        return () => clearTimeout(timer); 
      }, [input]);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
      };
      const handleClick = (id: number) => {
        navigate({ to: '/user/$id', params: { id: String(id) } });
      };
    
      const filtered = data.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );

      const paginated = filtered.slice((page - 1) * page_size, page * page_size);


  
    const rows = paginated.map((user) => (
        <Table.Tr key={user.id} onClick={() => handleClick(user.id)} style={{ cursor: 'pointer' }}>
        <Table.Td>{user.name}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
      </Table.Tr>
    ));
  
    return (
      <Container py="xl">
        <Title mb="md">User List</Title>
  
        <Group mb="md">
          <TextInput
            placeholder="Search by name"
            value={search}
            onChange={handleInputChange} 
             w="100%"
          />
        </Group>
  
          <Box>
            <Table striped highlightOnHover withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
          total={Math.ceil(filtered.length / page_size)}
          value={page}
          onChange={setPage}
          mt="md"
        />
          </Box>
      </Container>
    );
  }

