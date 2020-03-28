import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';


import logo from '../../assets/logo.png';
import styles from './styles'; 

export default function Detail(){
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou interessado(a) em ajudar com o caso "${incident.title}" no valor de R$ ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;
    
    const navigation = useNavigation();

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color= '#e02041'/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG: </Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>
                        
                <Text style={styles.incidentProperty}>Caso: </Text>
                <Text style={styles.incidentValue}>{incident.title} </Text>

                <Text style={styles.incidentProperty}>Valor: </Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) }  </Text>
                
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi dessa história!</Text>
                <Text style={styles.herodescription}>Entre em contato</Text>
                <View >

                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>                   
                
            </View>
        </View>
    );
}