import { colors } from '@/constants/colors';
import { StatusBar } from 'expo-status-bar';
import { GraduationCap, Search, XCircle } from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// 1. Dataset statis didefinisikan di luar komponen (minimal 5 item)
export const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi' },
];

export interface Mahasiswa {
  id: string;
  nama: string;
  prodi: string;
}

export default function DaftarMahasiswa() {
  // 2. State pencarian dengan useState
  const [keyword, setKeyword] = useState('');

  // 4. Real-time filtering menggunakan .filter() dan .toLowerCase()
  const dataTerfilter = DAFTAR_MAHASISWA.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <GraduationCap size={22} color={colors.primary} />
          <Text style={styles.headerTitle}>Direktori Mahasiswa</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Soal 2: Real-Time Search Filter & FlatList
        </Text>

        {/* 3. Search input bar terikat dengan state keyword (controlled input) */}
        <View style={styles.searchBar}>
          <Search size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama mahasiswa..."
            placeholderTextColor="#94a3b8"
            value={keyword}
            onChangeText={setKeyword}
            autoCapitalize="none"
          />
          {keyword.length > 0 && (
            <TouchableOpacity
              onPress={() => setKeyword('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <XCircle size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 5. FlatList dengan data, keyExtractor, renderItem, dan ListEmptyComponent */}
      <FlatList<Mahasiswa>
        data={dataTerfilter}
        keyExtractor={(item: Mahasiswa) => item.id}
        renderItem={({ item }: { item: Mahasiswa }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardNama}>{item.nama}</Text>
              <View style={styles.prodiBadge}>
                <Text style={styles.prodiText}>{item.prodi}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
          </View>
        }
      />

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 13,
    flex: 1,
    color: colors.text,
    paddingVertical: 0,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNama: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  prodiBadge: {
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  prodiText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    textAlign: 'center',
  },
});
