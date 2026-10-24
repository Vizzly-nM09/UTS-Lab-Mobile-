import InfoCard from '@/components/InfoCard';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TrendingUp } from 'lucide-react-native';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export default function App() {
  const router = useRouter();

  const handleInfoCardPress = (title: string, status: 'selesai' | 'proses') => {
    const detailMessage = `Mata Kuliah: ${title}\nStatus Pengerjaan: ${status === 'selesai' ? 'Selesai (Completed)' : 'Dalam Proses (In Progress)'
      }`;

    if (Platform.OS === 'web') {
      window.alert(`[Detail Tugas Akademik]\n\n${detailMessage}`);
    } else {
      Alert.alert('Detail Tugas Akademik', detailMessage, [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>UTS Lab Pemrograman Mobile</Text>
      <Text style={styles.headerSubtitle}>
        Dashboard Akademik • Semester Ganjil 2026/2027
      </Text>

      {/* 1. Gradient Frame Card (Aksen #0369a1) Pembungkus 3 Stat Cards */}
      <View style={styles.heroFrame}>
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#0284c7" />
              <Stop offset="50%" stopColor="#0369a1" />
              <Stop offset="100%" stopColor="#075985" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" rx="16" fill="url(#heroGradient)" />
        </Svg>

        <View style={styles.heroContent}>
          {/* Header Row: Subtitle & Persentase */}
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSubtitle}>Semester Ganjil 2026/2027</Text>
              <Text style={styles.heroMainValue}>Progres Akademik</Text>
            </View>

            <View style={styles.heroBadgeRight}>
              <TrendingUp size={16} color="#ffffff" />
              <Text style={styles.heroPercentage}>67%</Text>
            </View>
          </View>

          {/* Progress Bar Line */}
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          {/* 3 Inner Stat Cards: Total Tugas, Selesai, dan Proses */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, styles.statCardTotal]}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Total Tugas</Text>
            </View>

            <View style={[styles.statCard, styles.statCardSuccess]}>
              <Text style={[styles.statNumber, styles.textSuccessGlow]}>2</Text>
              <Text style={styles.statLabel}>Selesai</Text>
            </View>

            <View style={[styles.statCard, styles.statCardWarning]}>
              <Text style={[styles.statNumber, styles.textWarningGlow]}>1</Text>
              <Text style={styles.statLabel}>Proses</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. SOAL 1: Custom Reusable Component (InfoCard) - 3 Mata Kuliah */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Daftar Mata Kuliah
          </Text>
          <Text style={styles.sectionSub}>
            Daftar tugas mata kuliah yang ada pada semester ganjil 2026/2027
          </Text>
        </View>

        <InfoCard
          title="Lab. Pemrograman Mobile"
          status="proses"
          onPress={() =>
            handleInfoCardPress('Lab. Pemrograman Mobile', 'proses')
          }
        />

        <InfoCard
          title="Basis Data"
          status="selesai"
          onPress={() =>
            handleInfoCardPress('Basis Data Lanjut', 'selesai')
          }
        />

        <InfoCard
          title="Rekayasa Perangkat Lunak"
          status="selesai"
          onPress={() =>
            handleInfoCardPress('Rekayasa Perangkat Lunak', 'selesai')
          }
        />
      </View>

      {/* 3. SOAL 2: Navigasi ke Layar Direktori Mahasiswa */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Daftar Mahasiswa
          </Text>
          <Text style={styles.sectionSub}>
            Direktori mahasiswa dengan search bar, filter chips & modal detail
          </Text>
        </View>

        <TouchableOpacity
          style={styles.navCard}
          activeOpacity={0.7}
          onPress={() => router.push('/DaftarMahasiswa')}
        >
          <View style={styles.navTextContainer}>
            <Text style={styles.navTitle}>Buka Direktori Mahasiswa</Text>
            <Text style={styles.navDesc}>
              Daftar mahasiswa yang ada di semester ganjil 2026/2027
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
    fontSize: 22,
    fontWeight: '800',
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

  /* Gradient Frame Card Style */
  heroFrame: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#0369a1',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  heroContent: {
    padding: 18,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroMainValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 2,
  },
  heroBadgeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroPercentage: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
    marginLeft: 5,
  },
  progressTrack: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66.7%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },

  /* 3 Inner Stat Cards Inside Gradient Frame */
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  statCardTotal: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  statCardSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.22)',
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  statCardWarning: {
    backgroundColor: 'rgba(249, 115, 22, 0.22)',
    borderColor: 'rgba(251, 146, 60, 0.4)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 2,
  },
  textSuccessGlow: {
    color: '#a7f3d0',
  },
  textWarningGlow: {
    color: '#fed7aa',
  },
  statLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },

  /* Sections */
  section: {
    width: '100%',
    marginBottom: 18,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
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