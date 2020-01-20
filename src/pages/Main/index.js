import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import { Avatar, Container, Name, Bio, Techs, Form, Input, Button, TextButton } from './styles';

export default function Main({ navigation }) {
  const [ text, setText ] = useState([]);
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

  function handleRegionChange(region) {
    setCurrentRegion(region)
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('search', {
      params: {
          latitude,
          longitude,
          techs: text,
      },
    });

    setDevs(response.data.devs);
    setText('');
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
          value={text}
          onChangeText={setText}
        />
        <Button onPress={() => loadDevs()} >
          <Icon name="my-location" size={20} color="#fff" />
        </Button>
      </Form>
    </>
  );
}
