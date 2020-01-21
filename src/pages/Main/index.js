import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

import { Avatar, Container, Name, Bio, Techs, Form, Input, Button, TextButton } from './styles';

export default function Main({ navigation }) {
  const [ techs, setTechs ] = useState([]);
  const [ devs, setDevs ] = useState([]);
  const [ currentRegion, setCurrentRegion ] = useState({});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    )
  }, [])

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebsocket() {
    disconnect();
    
    const { latitude, longitude } = currentRegion;
    
    connect(
      latitude,
      longitude,
      techs,
      );
  }
  
  async function loadDevs() {
    
    const { latitude, longitude } = currentRegion;
    
    const response = await api.get('search', {
      params: {
        latitude,
        longitude,
        techs: techs,
      },
    });
    
    setDevs(response.data.devs);
    setTechs('');
    setupWebsocket();
  }
  
  function handleRegionChange(region) {
    setCurrentRegion(region)
  }
  
  if (!currentRegion) {
    return null
  }

  return (
    <>
      <MapView 
        onRegionChange={(region) => handleRegionChange(region)} 
        initialRegion={currentRegion}  
        style={{flex: 1}} 
      >
      {devs.map(dev => (
        <Marker 
          key={dev._id}
          coordinate={{ 
            latitude: dev.location.coordinates[1], 
            longitude: dev.location.coordinates[0],  
          }} 
        >
          <Avatar 
            source={{ uri: dev.avatar_url }} 
          />
          <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username })}>
            <Container>
              <Name>{dev.name}</Name>
              <Bio>{dev.bio}</Bio>
              <Techs>{dev.techs.join(', ')}</Techs>
            </Container>
          </Callout>
        </Marker>
      ))}
    </MapView>
      <Form>
        <Input 
          placeholder="Buscar por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs != '' ? techs : ''}
          onChangeText={setTechs}
        />
        <Button onPress={() => loadDevs()} >
          <Icon name="my-location" size={20} color="#fff" />
        </Button>
      </Form>
    </>
  );
}
