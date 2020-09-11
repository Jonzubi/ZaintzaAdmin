import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, Icon, Divider, ListItem } from 'react-native-elements';
import { API_URL } from '../utils/envConfig';
import Styles from '../utils/commonStyles';
import { traducirDias } from '../utils/functions';

const AnuncioInfoView = (props) => {
  const { anuncio } = props;
  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={{ ...Styles.rowCenter, padding: 15 }}>
          <Avatar
            rounded
            size={100}
            source={{
              uri: `${API_URL}/api/image/${anuncio.direcFoto}`,
            }}
          />
        </View>
        <Icon
          style={{ ...Styles.rowJustifyStart, ...Styles.listSpaceBottom }}
          name="title"
        />
        <Text>{anuncio.titulo}</Text>
        <Icon
          style={{
            ...Styles.rowJustifyStart,
            ...Styles.listSpaceBottom,
            ...Styles.listSpaceTop,
          }}
          name="description"
        />
        <Text>{anuncio.descripcion}</Text>
        <Icon
          style={{
            ...Styles.rowJustifyStart,
            ...Styles.listSpaceBottom,
            ...Styles.listSpaceTop,
          }}
          name="schedule"
        />
        {anuncio.horario.map((dia) => (
          <View style={Styles.rowSpaceBetween}>
            <Text>{traducirDias(dia.dia)}</Text>
            <Text> {`${dia.horaInicio} : ${dia.horaFin}`}</Text>
          </View>
        ))}
        <View
          style={{
            ...Styles.rowSpaceBetween,
            ...Styles.listSpaceBottom,
            ...Styles.listSpaceTop,
          }}>
          <Icon name="map" />
          <Text>{anuncio.pueblo[0]}</Text>
        </View>
        <View
          style={{
            ...Styles.rowSpaceBetween,
            ...Styles.listSpaceBottom,
            ...Styles.listSpaceTop,
          }}>
          <Icon name="group" />
          <Text>{`${anuncio.publico}`}</Text>
        </View>
        <View
          style={{
            ...Styles.rowSpaceBetween,
            ...Styles.listSpaceBottom,
            ...Styles.listSpaceTop,
          }}>
          <Icon name="toll" />
          <Text>{`${anuncio.precio} €`}</Text>
        </View>

        <View style={Styles.rowJustifyStart}>
          <Icon name="person" />
          <Text style={Styles.rowMarginLeft}>USUARIO</Text>
        </View>

        <ListItem style={Styles.listSpaceTop}>
          <Avatar
            rounded
            source={{
              uri: `${API_URL}/api/image/${anuncio.idCliente.direcFoto}`,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{`${anuncio.idCliente.nombre} ${anuncio.idCliente.apellido1}`}</ListItem.Title>
            <ListItem.Subtitle>{`${anuncio.idCliente.telefonoMovil} - ${
              anuncio.idCliente.telefonoFijo || 'Ez definitua'
            }`}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
    </View>
  );
};

export default AnuncioInfoView;
