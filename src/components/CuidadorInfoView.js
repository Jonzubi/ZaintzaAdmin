import React from 'react';
import { Avatar, Icon, Divider } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';
import moment from 'moment';
import { API_URL } from '../utils/envConfig';
import Styles from '../utils/commonStyles';
import { traducirDias } from '../utils/functions';
import { Colors } from '../utils/colors';

const Cuidador = (props) => {
  const { cuidador, valoraciones } = props;
  return (
    <View style={Styles.container}>
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
      </ScrollView>
    </View>
  );
};

export default Cuidador;
