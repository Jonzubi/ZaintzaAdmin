import React, { useState } from 'react';
import {
  Avatar,
  Icon,
  Divider,
  BottomSheet,
  ListItem,
  Button,
} from 'react-native-elements';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import moment from 'moment';
import { API_URL } from '../utils/envConfig';
import { banUser, unBanUser, deleteImgContact } from '../utils/API';
import Styles from '../utils/commonStyles';
import { traducirDias } from '../utils/functions';
import { Colors } from '../utils/colors';

const Cuidador = (props) => {
  const socket = useSelector((state) => state.socket.socket);
  const { cuidador, valoraciones } = props;
  const [sheetVisible, setSheetVisible] = useState(false);
  const [isBanned, setIsBanned] = useState(
    moment().isBefore(cuidador.bannedUntilDate),
  );

  let sheetList = [];
  console.log(isBanned);
  if (!isBanned) {
    sheetList = [
      {
        title: 'Banear',
        icon: 'error',
        iconColor: 'red',
        onPress: () => handleBanUser(),
      },
      {
        title: 'Eliminar foto contacto',
        icon: 'wallpaper',
        iconColor: 'yellow',
        onPress: () => handleDeleteImg(),
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
        title: 'Desbanear',
        icon: 'error',
        iconColor: 'green',
        onPress: () => handleUnBanUser(),
      },
      {
        title: 'Eliminar foto contacto',
        icon: 'wallpaper',
        iconColor: 'yellow',
        onPress: () => handleDeleteImg(),
      },
      {
        title: 'Cancelar',
        onPress: () => setSheetVisible(false),
        icon: 'cancel',
        iconColor: 'blue',
      },
    ];
  }

  const handleDeleteImg = async () => {
    setSheetVisible(false);
    await deleteImgContact(cuidador._id).catch((err) => {
      console.log(err.response.data);
      ToastAndroid.showWithGravity(
        'ERROR',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    });
    ToastAndroid.showWithGravity(
      'IMAGEN ELIMINADO!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  const handleUnBanUser = async () => {
    setSheetVisible(false);
    await unBanUser(cuidador._id).catch((err) => {
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
    setIsBanned(false);
  };

  const handleBanUser = async () => {
    setSheetVisible(false);
    await banUser(cuidador._id, 30).catch((err) => {
      console.log(err.response.data);
      ToastAndroid.showWithGravity(
        'ERROR',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    });
    socket.emit('kickBanned', {
      idPerfil: cuidador._id,
      banDays: 30,
    });
    ToastAndroid.showWithGravity(
      'BANEADO!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
    setIsBanned(true);
  };

  return (
    <View style={Styles.container}>
      <Button
        title="Acciones"
        icon={
          <Icon
            name="security"
            color={Colors.white}
            style={Styles.rowMarginRight}
          />
        }
        onPress={() => setSheetVisible(true)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ ...Styles.rowCenter, padding: 15 }}>
          <Avatar
            rounded
            size={100}
            source={{
              uri: `${API_URL}/api/image/${cuidador.direcFotoContacto}`,
            }}
          />
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Icon name="person" />
          <Text>{`${cuidador.nombre} ${cuidador.apellido1} ${cuidador.apellido2}`}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Icon name="today" />
          <Text>{moment(cuidador.fechaNacimiento).format('YYYY/MM/DD')}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Icon name="gender-male-female" type="material-community" />
          <Text>{cuidador.sexo}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Icon name="smartphone" />
          <Text>{cuidador.telefonoMovil}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Icon name="phone-classic" type="material-community" />
          <Text>{cuidador.telefonoFijo}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Icon name="map" />
          <View style={Styles.list}>
            {cuidador.ubicaciones.map((ubicacion) => (
              <Text>{`- ${ubicacion}`}</Text>
            ))}
          </View>
        </View>
        <Icon
          style={{ ...Styles.rowJustifyStart, ...Styles.listSpaceBottom }}
          name="schedule"
        />
        {cuidador.diasDisponible.map((dia) => (
          <View style={Styles.rowSpaceBetween}>
            <Text>{traducirDias(dia.dia)}</Text>
            <Text> {`${dia.horaInicio} : ${dia.horaFin}`}</Text>
          </View>
        ))}
        <Icon
          style={{
            ...Styles.rowJustifyStart,
            ...Styles.listSpaceBottom,
            ...Styles.listSpaceTop,
          }}
          name="toll"
        />
        <View style={Styles.rowSpaceBetween}>
          <Text>Haurrak</Text>
          <Text>{`${cuidador.precioPorPublico.nino || '--'} €`}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Text>Adinekoak</Text>
          <Text>{`${cuidador.precioPorPublico.terceraEdad} €`}</Text>
        </View>
        <View style={Styles.rowSpaceBetween}>
          <Text>Behar bereziak</Text>
          <Text>{`${
            cuidador.precioPorPublico.necesidadEspecial || '--'
          } €`}</Text>
        </View>
        <Icon
          style={{ ...Styles.rowJustifyStart, ...Styles.listSpaceTop }}
          name="description"
        />
        <Text style={Styles.listSpaceTop}>{cuidador.descripcion}</Text>
        <Icon
          style={{ ...Styles.rowJustifyStart, ...Styles.listSpaceTop }}
          name="stars"
        />
        {valoraciones.map((valoracion) => (
          <>
            <View style={{ ...Styles.rowSpaceBetween, ...Styles.listSpaceTop }}>
              <View style={Styles.rowJustifyStart}>
                <Text>{valoracion.valor}</Text>
                <Icon name="star" color={Colors.yellow} />
              </View>
              <Text>{valoracion.comentario}</Text>
            </View>
            <Divider
              style={{ ...Styles.listSpaceBottom, ...Styles.listSpaceTop }}
            />
          </>
        ))}
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

export default Cuidador;
