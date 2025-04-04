import { Card, Text, Title, Container, Box, Divider,Stack, Flex } from '@mantine/core';
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

       <Card style={{textAlign:"center", backgroundColor:"#d0bfff"} } >
            <Flex gap={10} >
              <Text  fw={600} style={{fontSize:"22px"}}>
                Email:
              </Text>
              <Text  style={{fontSize:"22px"}}>{user.email}</Text>
            </Flex>

            <Flex gap={10}>
              <Text fw={600} style={{fontSize:"22px"}} >
                Phone:
              </Text>
              <Text style={{fontSize:"22px"}}>{user.phone}</Text>
            </Flex>

            <Flex gap={10}>
              <Text style={{fontSize:"22px"}} fw={600}  >
                Website:
              </Text>
              <Text style={{fontSize:"22px"}} >{user.website}</Text>
            </Flex>

            <Flex gap={10}>
              <Text fw={600} style={{fontSize:"22px"}} >
                Company:
              </Text>
              <Text style={{fontSize:"22px"}} >{user.company?.name}</Text>
            </Flex>

            <Flex gap={10}>
              <Text style={{fontSize:"22px"}} fw={600}>
                Address:
              </Text>
              <Text style={{fontSize:"22px"}} >
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
