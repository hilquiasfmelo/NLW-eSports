import { View, TouchableOpacity, Text } from "react-native";
import { GameController } from 'phosphor-react-native'


import { THEME } from "../../theme";
import { styles } from "./styles";

import { DuoCardInfo } from "../DuoCardInfo";


export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoCardInfo label="Nome" value={data.name} />

      <DuoCardInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} ano(s)`}
      />

      <DuoCardInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoCardInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button}>
        <GameController
        color={THEME.COLORS.TEXT}
        size={20}
        />

        <Text style={styles.buttonTitle} onPress={onConnect}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
