import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';

export interface InfoCardProps {
  title: string;
  status: 'selesai' | 'proses';
  onPress: () => void;
}

export default function InfoCard({ title, status, onPress }: InfoCardProps) {
  const isSelesai = status === 'selesai';

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View
          style={[
            styles.badge,
            isSelesai ? styles.badgeSelesai : styles.badgeProses,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isSelesai ? styles.textSelesai : styles.textProses,
            ]}
          >
            {isSelesai ? 'Selesai' : 'Proses'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 10,
    lineHeight: 20,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeSelesai: {
    backgroundColor: colors.successBg,
    borderColor: '#a7f3d0',
    borderWidth: 1,
  },
  badgeProses: {
    backgroundColor: colors.warningBg,
    borderColor: '#fed7aa',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  textSelesai: {
    color: '#047857',
  },
  textProses: {
    color: '#c2410c',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
