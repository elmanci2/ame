
import states from '../../../data/states.json' assert { type: 'json' };
import cities from '../../../data/cities.json' assert { type: 'json' };

export function getStatesAnCountries(_, arg) {
    if (arg.type === 1) {
        const results = states.states.filter((e) => e.id_country === arg.id)
        return results
    }
    const results = cities.cities.filter((e) => e.id_state === arg.id)
    return results
}

