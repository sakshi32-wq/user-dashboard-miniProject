import {
    Table,
    Container,
    Title,
    Pagination,   
     Box,
    TextInput,
    Card,
    Stack,
    Skeleton,
    
  } from '@mantine/core';
  import { useQuery } from '@tanstack/react-query';
  import { fetchUsers } from '../api/api'; 
  import { useNavigate } from '@tanstack/react-router';
  import { useEffect, useState } from 'react';
  import type { User } from '../api/api'; 
  
  export default function HomePage() {
    const { data = [],isLoading, isError} = useQuery<User[]>({
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
        }, 1000);
    
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

      if (isLoading) return    <>
      
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </>
      if (isError) return <Container style={{
        color:"red",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight:"bold",
        fontSize:"24px"
      }}>Error loading user details.</Container>;

  
    return (
        <Container size="lg" py="xl" px="md">
        <Card
          shadow="lg"
          padding="xl"
          radius="xl"
          withBorder
          style={{
            backgroundColor: '#f3f0ff',
            borderColor: '#d0bfff',
            borderWidth: '2px',
            borderStyle: 'solid',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <Stack gap="lg">
            <Title ta="center" style={{ color: '#5f3dc4' }}>
              User List
            </Title>
      
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <TextInput
                placeholder="Search by name"
                value={input}
                onChange={handleInputChange}
                w="100%"
                style={{ maxWidth: 600}}
              />
            </Box>
      
            <Box
              style={{
                width: '100%',
              }}
            >
              <Table
                highlightOnHover
                striped
                withColumnBorders
                style={{
                  width: '100%',
                  minWidth: 600,
                  height:200,
                  tableLayout: 'fixed',
                  borderCollapse: 'collapse',
                  border: '2px solid #d0bfff',
                }}
              >
                <Table.Thead style={{ backgroundColor: '#e5dbff' }}>
                  <Table.Tr>
                    <Table.Th
                      style={{
                        color: '#3b2f63',
                        fontSize: '22px',
                        textAlign: 'left',
                        paddingLeft: '12px',
                        fontWeight:600
                      }}
                    >
                      Name
                    </Table.Th>
                    <Table.Th
                      style={{
                        color: '#3b2f63',
                        fontSize: '22px',
                        textAlign: 'left',
                        paddingLeft: '12px',
                        fontWeight:600

                      }}
                    >
                      Email
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginated.map((user) => (
                    <Table.Tr
                      key={user.id}
                      onClick={() => handleClick(user.id)}
                      style={{ cursor: 'pointer' ,fontSize:"20px"}}
                    >
                      <Table.Td style={{ textAlign: 'left', paddingLeft: '12px' }}>
                        {user.name}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'left', paddingLeft: '12px' }}>
                        {user.email}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>
      
            <Box mt="md" style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                total={Math.ceil(filtered.length / page_size)}
                value={page}
                onChange={setPage}
                radius="xl"
                color="grape"
              />
            </Box>
          </Stack>
        </Card>
      </Container>
      
      
      
    );
  }

