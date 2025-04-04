import { Card, Text, Title, Container, Group, Box, Divider, Paper, Stack, Flex } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/api'; 
import type { User } from '../api/api'; 

export default function UserDetailsPage() {
  const { id } = useParams({ strict: false }); 

  const { data: users = [], isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const user = users.find((u) => u.id === Number(id));

  if (isLoading) return <Container  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight:"bold",
    fontSize:"24px"
  }}>Loading...</Container>;

  if (isError) return <Container  style={{
    color:"red",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight:"bold",
    fontSize:"24px"
  }}>Error loading user details.</Container>;

  if (!user) return <Container>User not found.</Container>;

  return (
    <>

    <Title  style={{
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    fontSize:"30px",  
    marginTop:"50px"   
  }}>User Details</Title>
  
<Box
  style={{
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',     
    boxSizing: 'border-box',
  }}
>  

  <Card
    
    radius="xl"
    withBorder
    style={{
      borderColor: '#c9a9ff',
      borderWidth: '2px',
      borderStyle: 'solid',
      backgroundColor: '#d0bfff',
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '900px',
      marginTop:"100px",
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15',  }}
  >
      <Stack >
        <Box>
          <Title  ta="center" style={{color:"voilet"}} >
            {user.name}
          </Title>
          
        </Box>

        <Divider my="xs" color="blue" />

       <Card style={{fontSize:24, textAlign:"center"} } >
            <Flex>
              <Text ta="center" fw={600}   style={{fontSize:24}}>
                Email:
              </Text>
              <Text ta="center" style={{fontSize:24}}>{user.email}</Text>
            </Flex>

            <Flex>
              <Text fw={600}  >
                Phone:
              </Text>
              <Text >{user.phone}</Text>
            </Flex>

            <Flex>
              <Text  fw={600}  w={100}>
                Website:
              </Text>
              <Text >{user.website}</Text>
            </Flex>

            <Flex>
              <Text fw={600}  >
                Company:
              </Text>
              <Text >{user.company?.name}</Text>
            </Flex>

            <Flex>
              <Text  fw={600}>
                Address:
              </Text>
              <Text >
                {user.address?.suite}, {user.address?.street},
                {user.address?.city} , {user.address?.zipcode}
              </Text>
            </Flex>
            </Card>
          </Stack>
       
    </Card>
  </Box>
  </>
  
  );
}
