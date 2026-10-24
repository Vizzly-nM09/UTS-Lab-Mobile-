import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, GraduationCap, Search, X, XCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

// 1. Dataset statis didefinisikan di luar komponen utama (minimal 5 item)
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

const DAFTAR_PRODI = [
  'Semua',
  'Sistem Informasi',
  'Teknologi Informasi',
  'Teknik Informatika',
];

export default function DaftarMahasiswa() {
  // 2. State pencarian dengan useState
  const [keyword, setKeyword] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('Semua');
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);

  // 4. Real-time filtering menggunakan .filter() dan .toLowerCase() (case-insensitive)
  const dataTerfilter = DAFTAR_MAHASISWA.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(keyword.toLowerCase());
    const cocokProdi =
      selectedProdi === 'Semua' || item.prodi === selectedProdi;
    return cocokNama && cocokProdi;
  });

  // Helper untuk mendapatkan inisial nama
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <View style={styles.container}>
      {/* Header & Search Bar */}
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
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <XCircle size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips Prodi */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {DAFTAR_PRODI.map((prodi) => {
            const isSelected = selectedProdi === prodi;
            return (
              <TouchableOpacity
                key={prodi}
                style={[
                  styles.chip,
                  isSelected ? styles.chipSelected : styles.chipUnselected,
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedProdi(prodi)}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                  ]}
                >
                  {prodi}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Dynamic Counter Bar */}
      <View style={styles.counterBar}>
        <Text style={styles.counterText}>
          Menampilkan{' '}
          <Text style={styles.counterHighlight}>{dataTerfilter.length}</Text> dari{' '}
          {DAFTAR_MAHASISWA.length} mahasiswa
        </Text>
      </View>

      {/* 5. FlatList dengan data, keyExtractor, renderItem, dan ListEmptyComponent */}
      <FlatList<Mahasiswa>
        data={dataTerfilter}
        keyExtractor={(item: Mahasiswa) => item.id}
        renderItem={({ item }: { item: Mahasiswa }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => setSelectedMahasiswa(item)}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{getInitials(item.nama)}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardNama}>{item.nama}</Text>
              <View style={styles.prodiBadge}>
                <Text style={styles.prodiText}>{item.prodi}</Text>
              </View>
            </View>

            <ChevronRight size={18} color="#cbd5e1" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
            <Text style={styles.emptySubText}>
              Coba gunakan kata kunci atau pilihan program studi lainnya.
            </Text>
          </View>
        }
      />

      {/* Slide-Up Bottom Sheet Modal for Student Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedMahasiswa !== null}
        onRequestClose={() => setSelectedMahasiswa(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedMahasiswa(null)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {/* Modal Drag Handle */}
            <View style={styles.modalHandle} />

            {selectedMahasiswa && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalAvatarLarge}>
                    <Text style={styles.modalAvatarText}>
                      {getInitials(selectedMahasiswa.nama)}
                    </Text>
                  </View>
                  <Text style={styles.modalNama}>{selectedMahasiswa.nama}</Text>
                  <Text style={styles.modalProdi}>{selectedMahasiswa.prodi}</Text>
                </View>

                {/* Detail Information Box */}
                <View style={styles.detailCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ID Mahasiswa</Text>
                    <Text style={styles.detailValue}>
                      MHS-00{selectedMahasiswa.id}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Program Studi</Text>
                    <Text style={styles.detailValue}>
                      {selectedMahasiswa.prodi}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tahun Ajaran</Text>
                    <Text style={styles.detailValue}>2026/2027 Ganjil</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status Akademik</Text>
                    <View style={styles.statusPill}>
                      <View style={styles.statusDot} />
                      <Text style={styles.statusPillText}>Aktif</Text>
                    </View>
                  </View>
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMahasiswa(null)}
                >
                  <Text style={styles.closeButtonText}>Tutup</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

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
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
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
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 13,
    flex: 1,
    color: colors.text,
    paddingVertical: 0,
  },
  chipsContainer: {
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipUnselected: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  chipTextUnselected: {
    color: colors.textMuted,
  },
  counterBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background,
  },
  counterText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  counterHighlight: {
    fontWeight: '700',
    color: colors.primary,
  },
  listContent: {
    padding: 16,
    paddingTop: 4,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  cardInfo: {
    flex: 1,
  },
  cardNama: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  prodiBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  prodiText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 11,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 12,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalHandle: {
    width: 38,
    height: 4,
    backgroundColor: '#cbd5e1',
    borderRadius: 2,
    marginBottom: 16,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#bae6fd',
  },
  modalAvatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  modalNama: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  modalProdi: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  detailCard: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  closeButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
