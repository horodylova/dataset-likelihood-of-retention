'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import FilterCard from './FilterCard';

export default function AgencySection({ onMultiSelectionChange, resetSignal }) {
    const initialAgencyState = {
        agencyTotal: false,
        none: false,
        unknown: false,
        integralCare: false,
        theCharlieCenter: false,
        fec: false,
        dacc: false,
        commUnityCare: false,
        frontSteps: false,
        sunrise: false,
        toof: false,
        caritas: false,
        trinityCenter: false,
        queertopia: false,
        urbanAlchmey: false,
        endeavors: false,
        salvationArmy: false,
        maximizingHope: false,
        bluebonnetTrails: false,
        blueBonnetTrails: false,
        capMetro: false,
        austinPublicHealth: false,
        safeAlliance: false,
        atcems: false,
        veteransAffairs: false,
        centralHealth: false,
        befriender: false,
        lincStreetOutreach: false,
        goodwill: false,
        lifeworks: false,
        austinStateHospital: false,
        aidsServicesOfAustin: false,
        ywca: false,
        wrightWellnessCenter: false,
        travisCoWorkforce: false,
        theShac: false,
        foundationForTheHomeless: false,
        foundationCommunities: false,
        firstBaptistChurchAustin: false,
        easterseals: false,
        echo: false,
        communityMedicalServices: false,
        bss: false,
        austinStone: false,
        austinRecovery: false,
        aNewEntry: false,
        cmAgency: false,
    };

    const [agencyFilters, setAgencyFilters] = useState(initialAgencyState);

    const agencies = [
        // Префикс: сначала None и Unknown
        { key: 'none', label: 'None' },
        { key: 'unknown', label: 'Unknown' },

        // Далее по убыванию из вашего списка
        { key: 'integralCare', label: 'Integral Care' },           // 117
        { key: 'theCharlieCenter', label: 'The Charlie Center' },  // 98
        { key: 'fec', label: 'FEC' },                              // 74
        { key: 'dacc', label: 'DACC' },                            // 69
        { key: 'commUnityCare', label: 'CommUnity Care' },         // 56
        { key: 'frontSteps', label: 'Front Steps' },               // 55
        { key: 'sunrise', label: 'Sunrise' },                      // 54
        { key: 'toof', label: 'TOOF' },                            // 40
        { key: 'caritas', label: 'Caritas' },                      // 20
        { key: 'trinityCenter', label: 'Trinity Center' },         // 18
        { key: 'queertopia', label: 'Queertopia' },                // 18
        { key: 'urbanAlchmey', label: 'Urban Alchmey' },           // 17
        { key: 'endeavors', label: 'Endeavors' },                  // 16
        { key: 'salvationArmy', label: 'Salvation Army' },         // 14
        { key: 'maximizingHope', label: 'Maximizing Hope' },       // 13
        { key: 'bluebonnetTrails', label: 'Bluebonnet Trails' },   // 13
        { key: 'capMetro', label: 'CapMetro' },                    // 11
        { key: 'austinPublicHealth', label: 'Austin Public Health' }, // 10
        { key: 'safeAlliance', label: 'SAFE Alliance' },           // 6
        { key: 'atcems', label: 'ATCEMS' },                        // 6
        { key: 'veteransAffairs', label: 'Veterans Affairs' },     // 5
        { key: 'centralHealth', label: 'Central Health' },         // 5
        { key: 'befriender', label: 'Befriender' },                // 5
        { key: 'lincStreetOutreach', label: 'LINC Street Outreach' }, // 3
        { key: 'goodwill', label: 'Goodwill' },                    // 3
        { key: 'lifeworks', label: 'Lifeworks' },                  // 2
        { key: 'austinStateHospital', label: 'Austin State Hospital' }, // 2
        { key: 'aidsServicesOfAustin', label: 'AIDS Services of Austin' }, // 2
        { key: 'ywca', label: 'YWCA' },                            // 1
        { key: 'wrightWellnessCenter', label: 'Wright Wellness Center' }, // 1
        { key: 'travisCoWorkforce', label: 'Travis Co Workforce' }, // 1
        { key: 'theShac', label: 'The SHAC' },                     // 1
        { key: 'foundationForTheHomeless', label: 'Foundation for the Homeless' }, // 1
        { key: 'foundationCommunities', label: 'Foundation Communities' }, // 1
        { key: 'firstBaptistChurchAustin', label: 'First Baptist Church Austin' }, // 1
        { key: 'easterseals', label: 'Easterseals' },              // 1
        { key: 'echo', label: 'ECHO' },                            // 1
        { key: 'communityMedicalServices', label: 'Community Medical Services' }, // 1
        { key: 'blueBonnetTrails', label: 'Blue Bonnet Trails' },  // 1
        { key: 'bss', label: 'BSS+' },                             // 1 (обновлена метка)
        { key: 'austinStone', label: 'Austin Stone' },             // 1
        { key: 'austinRecovery', label: 'Austin Recovery' },       // 1
        { key: 'aNewEntry', label: 'A New Entry' },                // 1

        // Служебный пункт (если нужен), оставим в конце
        { key: 'cmAgency', label: 'CM Agency' },
    ];

    const handleAgencyChange = useCallback((key, checked) => {
        setAgencyFilters(prev => ({ ...prev, [key]: checked }));
    }, []);

    useEffect(() => {
        const values = [];
        agencies.forEach(a => {
            if (agencyFilters[a.key]) values.push(a.label);
        });
        if (onMultiSelectionChange) {
            onMultiSelectionChange('Agency', { combined: !!agencyFilters.agencyTotal, values });
        }
    }, [agencyFilters, onMultiSelectionChange]);

    useEffect(() => {
        if (resetSignal == null) return;
        setAgencyFilters({ ...initialAgencyState });
    }, [resetSignal]);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            maxHeight: '400px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#FF5E00 #f1f1f1'
        }}>
            <FilterCard
                title="Agency"
                headerChecked={agencyFilters.agencyTotal}
                headerOnChange={(e) => handleAgencyChange('agencyTotal', e.value)}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '10px',
                    alignItems: 'center',
                    marginLeft: '20px'
                }}>
                    {agencies.map(({ key, label }) => (
                        <Checkbox
                            className="agency-checkbox agency-checkbox--wrap"
                            key={key}
                            label={label}
                            checked={agencyFilters[key]}
                            onChange={(e) => handleAgencyChange(key, e.value)}
                        />
                    ))}
                </div>
            </FilterCard>
        </div>
    );
}