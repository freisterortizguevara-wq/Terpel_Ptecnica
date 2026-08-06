import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StationCard } from '../StationCard'

// Mock del hook useToggleStationActive
vi.mock('../../hooks/useStations', () => ({
  useToggleStationActive: () => ({
    mutate: vi.fn(),
  }),
}))

// Mock de estación
const mockStation = {
  id: 1,
  station_id: '001',
  name: 'Estación Prueba 1',
  status: 'published',
  updated_at: '2025-01-06T10:00:00Z',
  is_active: true,
  city: 'Bogotá',
  address: 'Calle 100 # 15-20',
}

// Crear QueryClient para el provider
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('StationCard', () => {
  const renderWithQueryClient = (ui) => {
    const testQueryClient = createTestQueryClient()
    return render(
      <QueryClientProvider client={testQueryClient}>
        {ui}
      </QueryClientProvider>
    )
  }

  it('✅ Renderiza la información de la estación correctamente', () => {
    renderWithQueryClient(
      <StationCard 
        station={mockStation} 
        isSelected={false} 
        onSelect={() => {}}
      />
    )

    expect(screen.getByText('Estación Prueba 1')).toBeInTheDocument()
    expect(screen.getByText(/001/)).toBeInTheDocument()
    expect(screen.getByText('published')).toBeInTheDocument()
    expect(screen.getByText('Bogotá')).toBeInTheDocument()
    expect(screen.getByText('Calle 100 # 15-20')).toBeInTheDocument()
  })

  it('✅ Muestra el estado "Activa" cuando is_active es true', () => {
    renderWithQueryClient(
      <StationCard 
        station={mockStation} 
        isSelected={false} 
        onSelect={() => {}}
      />
    )

    const toggleButton = screen.getByRole('button', { name: /Alternar estado de Estación Prueba 1/i })
    expect(toggleButton).toHaveTextContent('Activa')
    expect(toggleButton).toHaveClass('active')
  })

  it('✅ Muestra el estado "Inactiva" cuando is_active es false', () => {
    const inactiveStation = { ...mockStation, is_active: false }
    
    renderWithQueryClient(
      <StationCard 
        station={inactiveStation} 
        isSelected={false} 
        onSelect={() => {}}
      />
    )

    const toggleButton = screen.getByRole('button', { name: /Alternar estado de Estación Prueba 1/i })
    expect(toggleButton).toHaveTextContent('Inactiva')
    expect(toggleButton).toHaveClass('inactive')
  })

  it('✅ Llama a onSelect cuando se hace clic en la tarjeta', () => {
    const onSelectMock = vi.fn()
    
    renderWithQueryClient(
      <StationCard 
        station={mockStation} 
        isSelected={false} 
        onSelect={onSelectMock}
      />
    )

    const card = screen.getByText('Estación Prueba 1').closest('.station-card')
    fireEvent.click(card)
    
    expect(onSelectMock).toHaveBeenCalledWith('001')
  })

  it('✅ Aplica la clase "selected" cuando isSelected es true', () => {
    renderWithQueryClient(
      <StationCard 
        station={mockStation} 
        isSelected={true} 
        onSelect={() => {}}
      />
    )

    const card = screen.getByText('Estación Prueba 1').closest('.station-card')
    expect(card).toHaveClass('selected')
  })

  it('✅ No aplica la clase "selected" cuando isSelected es false', () => {
    renderWithQueryClient(
      <StationCard 
        station={mockStation} 
        isSelected={false} 
        onSelect={() => {}}
      />
    )

    const card = screen.getByText('Estación Prueba 1').closest('.station-card')
    expect(card).not.toHaveClass('selected')
  })
})