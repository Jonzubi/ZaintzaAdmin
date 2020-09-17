import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { Avatar, Icon, ListItem, BottomSheet } from 'react-native-elements';
import { API_URL } from '../utils/envConfig';
import { isUserBanned, banUser, unBanUser } from '../utils/API';
import Styles from '../utils/commonStyles';
import { traducirDias } from '../utils/functions';

const AnuncioInfoView = (props) => {
  const socket = useSelector((state) => state.socket.socket);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const { anuncio } = props;

  let sheetList = [
    {
      title: 'Cancelar',
      onPress: () => setSheetVisible(false),
      icon: 'cancel',
      iconColor: 'blue',
    },
  ];
  console.log(isBanned);
  if (isBanned) {
    sheetList = [
      {
        title: 'Desbanear',
        icon: 'error',
        iconColor: 'green',
        onPress: () => handleUnBanUser(),
      },
      {
        title: 'Cancelar',
        onPress: () => setSheetVisible(false),
        icon: 'cancel',
        iconColor: 'blue',
      },
    ];
  } else {
    sheetList = [
      {
        title: 'Banear',
        icon: 'error',
        iconColor: 'red',
        onPress: () => handleBanUser(),
      },
      {
        title: 'Cancelar',
        onPress: () => setSheetVisible(false),
        icon: 'cancel',
        iconColor: 'blue',
      },
    ];
  }

  const handleOpenActionSheet = async () => {
    const auxIsBanned = await (await isUserBanned(anuncio.idCliente._id)).data;
    setIsBanned(auxIsBanned);
    setSheetVisible(true);
  };

  const handleUnBanUser = async () => {
    setSheetVisible(false);
    await unBanUser(anuncio.idCliente._id).catch((err) => {
      console.log(err.response.data);
      ToastAndroid.showWithGravity(
        'ERROR',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    });
    ToastAndroid.showWithGravity(
      'UNBANNEADO!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  const handleBanUser = async () => {
    setSheetVisible(false);
    await banUser(anuncio.idCliente._id, 30).catch((err) => {
      console.log(err.response.data);
      ToastAndroid.showWithGravity(
        'ERROR',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    });
    socket.emit('kickBanned', {
      idPerfil: anuncio.idCliente._id,
      banDays: 30,
    });
    ToastAndroid.showWithGravity(
      'BANEADO!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <ListItem
          style={Styles.listSpaceTop}
          onPress={() => handleOpenActionSheet()}>
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
        <BottomSheet isVisible={sheetVisible}>
          {sheetList.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}>
              <Icon name={l.icon} color={l.iconColor} />
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </ScrollView>
    </View>
  );
};

export default AnuncioInfoView;
