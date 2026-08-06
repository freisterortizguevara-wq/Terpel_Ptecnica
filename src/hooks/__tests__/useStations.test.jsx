import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useStations, useToggleStationActive } from '../useStations'
import React from 'react'

// Mock del API
vi.mock('../../services/api', () => ({
  fetchStations: vi.fn(),
  toggleStationActive: vi.fn(),
}))

import { fetchStations, toggleStationActive } from '../../services/api'

// Datos mock
const mockStations = [
  { 
    id: 1, 
    station_id: '001', 
    name: 'Estación 1', 
    status: 'published', 
    is_active: true, 
    updated_at: '2025-01-06T10:00:00Z' 
  },
  { 
    id: 2, 
    station_id: '002', 
    name: 'Estación 2', 
    status: 'draft', 
    is_active: false, 
    updated_at: '2025-01-05T10:00:00Z' 
  },
]

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const Wrapper = ({ children }) => {
  const testQueryClient = createTestQueryClient()
  return React.createElement(
    QueryClientProvider,
    { client: testQueryClient },
    children
  )
}

describe('useStations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('✅ Trae las estaciones correctamente', async () => {
    fetchStations.mockResolvedValue(mockStations)

    const { result } = renderHook(() => useStations(), { wrapper: Wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockStations)
    expect(fetchStations).toHaveBeenCalledTimes(1)
  })

  it('✅ Maneja errores correctamente', async () => {
    const errorMessage = 'Error al cargar estaciones'
    fetchStations.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useStations(), { wrapper: Wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error.message).toBe(errorMessage)
    })
  })
})

describe('useToggleStationActive', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('✅ Cambia el estado de la estación correctamente', async () => {
    const updatedStation = { ...mockStations[0], is_active: false }
    toggleStationActive.mockResolvedValue(updatedStation)

    const { result } = renderHook(() => useToggleStationActive(), { wrapper: Wrapper })

    result.current.mutate({ stationId: '001', currentActive: true })

    await waitFor(() => {
      expect(toggleStationActive).toHaveBeenCalledWith('001', true)
    })
  })
})