import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import InfoCard from '@/components/InfoCard';
import { colors } from '@/constants/colors';

export default function App() {
  const router = useRouter();

  const handleInfoCardPress = (title: string, status: 'selesai' | 'proses') => {
    const detailMessage = `Tugas: ${title}\nStatus: ${status === 'selesai' ? 'Selesai (Completed)' : 'Proses (In Progress)'}`;

    if (Platform.OS === 'web') {
      window.alert(`[Detail Tugas]\n\n${detailMessage}`);
    } else {
      Alert.alert('Detail Tugas', detailMessage, [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>UTS Lab Pemrograman Mobile</Text>
      <Text style={styles.headerSubtitle}>
        Universitas Internasional Batam • Semester Ganjil 2026/2027
      </Text>

      {/* Kartu Identitas Mahasiswa */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Nama Mahasiswa:</Text>
        <Text style={styles.cardValue}>Fadhlan Limanda</Text>

        <Text style={styles.cardLabel}>NPM:</Text>
        <Text style={styles.cardValue}>2532066</Text>

        <Text style={styles.cardLabel}>Mata Kuliah / SKS:</Text>
        <Text style={styles.cardValue}>Lab. Pemrograman Mobile / 1 SKS</Text>

        <Text style={styles.cardLabel}>Status Ujian:</Text>
        <Text style={styles.statusSuccess}>✓ Sedang Dikerjakan (Aktif)</Text>
      </View>

      {/* SOAL 1: Custom Reusable Component (InfoCard) dirender minimal 2x */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Soal 1: Reusable Component (InfoCard)
          </Text>
          <Text style={styles.sectionSub}>
            Komponen InfoCard dengan dynamic props, conditional styling, & callback
          </Text>
        </View>

        <InfoCard
          title="Jobsheet 05 – Navigasi Expo Router & Dynamic Route"
          status="selesai"
          onPress={() =>
            handleInfoCardPress(
              'Jobsheet 05 – Navigasi Expo Router & Dynamic Route',
              'selesai'
            )
          }
        />

        <InfoCard
          title="UTS Lab Pemrograman Mobile – Implementasi Soal 1 & 2"
          status="proses"
          onPress={() =>
            handleInfoCardPress(
              'UTS Lab Pemrograman Mobile – Implementasi Soal 1 & 2',
              'proses'
            )
          }
        />
      </View>

      {/* SOAL 2: Navigasi ke Layar Direktori Mahasiswa */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Soal 2: Real-Time Filter & FlatList
          </Text>
          <Text style={styles.sectionSub}>
            Pencarian data mahasiswa real-time dengan controlled TextInput & FlatList
          </Text>
        </View>

        <TouchableOpacity
          style={styles.navCard}
          activeOpacity={0.7}
          onPress={() => router.push('/DaftarMahasiswa')}
        >
          <View style={styles.navTextContainer}>
            <View style={styles.badgeWrapper}>
              <Text style={styles.navBadge}>Soal 2</Text>
            </View>
            <Text style={styles.navTitle}>Buka Direktori Mahasiswa</Text>
            <Text style={styles.navDesc}>
              Dataset statis 5 mahasiswa, filter case-insensitive, dan ListEmptyComponent
            </Text>
          </View>
          <Text style={styles.navArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    paddingTop: 54,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    width: '100%',
    borderColor: colors.border,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  statusSuccess: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.success,
    marginTop: 4,
  },
  section: {
    width: '100%',
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSub: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  navCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  navTextContainer: {
    flex: 1,
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  navBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
  },
  navDesc: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 3,
    lineHeight: 16,
  },
  navArrow: {
    fontSize: 20,
    color: colors.primary,
    marginLeft: 12,
    fontWeight: 'bold',
  },
});