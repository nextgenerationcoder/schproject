import { Link } from 'react-router-dom'

import { ComingSoon } from '../components/ComingSoon'

export function RequestsPage() {
  return (
    <ComingSoon
      title="Kundenanfragen"
      description="Hier erscheinen eingehende Angebotsanfragen aus dem E-Mail-Postfach mit KI-gestützter Auswertung."
      plannedFeatures={[
        'Durchsuchbare und filterbare Anfrageliste',
        'Originale E-Mail und extrahierte Angaben',
        'Hinweise auf fehlende Informationen',
        'Zuweisung an Mitarbeitende',
      ]}
    />
  )
}

export function QuotationsPage() {
  return (
    <ComingSoon
      title="Angebote"
      description="Hier werden berechnete Angebote geprüft, bearbeitet und freigegeben."
      plannedFeatures={[
        'Nachvollziehbare Preisberechnung je Position',
        'Angebotsvorschau auf Deutsch',
        'Versionierung und Freigabe durch Mitarbeitende',
        'E-Mail-Entwurf (kein automatischer Versand)',
      ]}
    />
  )
}

export function ProductsPage() {
  return (
    <ComingSoon
      title="Produkte und Preise"
      description="Hier pflegen berechtigte Administratoren Produktkatalog, Preise und Kostenregeln."
      plannedFeatures={[
        'Produkte und Produktkategorien',
        'Preise, Leistungen und Lieferkosten',
        'Rabattregeln',
        'Mehrwertsteuer-Klassifizierungen',
      ]}
    />
  )
}

export function CustomersPage() {
  return (
    <ComingSoon
      title="Kunden"
      description="Hier werden Kundendaten und kundenspezifische Konditionen verwaltet."
      plannedFeatures={['Kundenstammdaten', 'Kundenspezifische Preise und Rabatte', 'Anfrage- und Angebotsverlauf']}
    />
  )
}

export function SettingsPage() {
  return (
    <ComingSoon
      title="Einstellungen"
      description="Hier werden Systemeinstellungen und Integrationen konfiguriert."
      plannedFeatures={[
        'E-Mail-Anbieter (Microsoft 365 oder Gmail)',
        'KI-Anbieter',
        'Firmendaten und Angebotsvorlage',
        'Freigaberegeln und Lieferpreis-Konfiguration',
      ]}
    />
  )
}

export function NotFoundPage() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-slate-900">Seite nicht gefunden</h2>
      <p className="mt-2 text-sm text-slate-600">Die angeforderte Seite existiert nicht.</p>
      <Link to="/" className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline">
        Zurück zum Dashboard
      </Link>
    </div>
  )
}
