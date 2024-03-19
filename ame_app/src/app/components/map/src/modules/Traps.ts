/**
 * @imports
 */
import {useEffect, useState} from 'react';
import {toQueryParams, toLatLng, toCoordinate, toNameId} from './Tools';
import * as GeoLib from 'geolib';
import TrapTypes from '../constants/TrapTypes';

interface TrapsProps {
  instance: any;
}

interface Trap {
  index: number;
  state: string;
  type: string;
  coordinate: any;
  radius?: number;
  options?: any;
  innerRadius?: number;
  centerRadius?: number;
  outerRadius?: number;
  courseTolerance?: number;
  step?: any;
  nextStep?: any;
  callback?: any;
}

const Traps: React.FC<TrapsProps> = ({instance}) => {
  const [traps, setTraps] = useState<{[key: number]: Trap}>({});
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const execute = (position: any) => {
      const {coordinate, heading, altitude} = position;
      matches(coordinate, heading);
    };

    const add = (trap: Trap, callback: any) => {
      setCounter(prevCounter => prevCounter + 1);
      const newCounter = counter + 1;

      const newTrap = {
        ...trap,
        index: newCounter,
        state: TrapTypes.States.OUTSIDE,
        callback: callback,
      };

      Object.keys(TrapTypes.States).forEach(state => {
        newTrap[toNameId(state, 'is')] = () => newTrap.state === state;
      });

      setTraps(prevTraps => ({
        ...prevTraps,
        [newCounter]: newTrap,
      }));

      return newTrap;
    };

    const getArray = () => {
      return Object.values(traps);
    };

    const watchRadius = (
      coordinate: any,
      radius: number,
      options: any,
      callback: any,
    ) => {
      return add(
        {
          type: TrapTypes.Types.CIRCLE,
          coordinate,
          radius,
          options,
        },
        callback,
      );
    };

    const watchStep = (
      step: any,
      nextStep: any,
      options: any,
      callback: any,
    ) => {
      options = {
        distance: 15,
        innerRadiusTolerance: 0.75,
        centerRadiusTolerance: 0.5,
        courseTolerance: 30,
        ...options,
      };

      const distanceToNextPoint = options.distance || step.distance.value; // in meters

      const coordinate = step.start;

      return add(
        {
          type: TrapTypes.Types.STEP,
          innerRadius: distanceToNextPoint * options.innerRadiusTolerance,
          centerRadius: distanceToNextPoint * options.centerRadiusTolerance,
          outerRadius: distanceToNextPoint,
          courseTolerance: options.courseTolerance,
          coordinate,
          step,
          nextStep,
        },
        callback,
      );
    };

    const nextState = (trap: Trap, event: string, state: string) => {
      const updatedTraps = {
        ...traps,
        [trap.index]: {
          ...traps[trap.index],
          state: state,
        },
      };
      setTraps(updatedTraps);

      if (typeof trap.callback === 'function') {
        trap.callback(trap, event, state);
      }
    };

    const matches = (coordinate: any, heading: number) => {
      Object.keys(traps).forEach(index => {
        const trap = traps[index];

        if (trap.state !== TrapTypes.States.EXPIRED) {
          switch (trap.type) {
            case TrapTypes.Types.CIRCLE:
              if (
                GeoLib.isPointWithinRadius(
                  coordinate,
                  trap.coordinate,
                  trap.radius || 0,
                )
              ) {
                // Inside circle trap
              }
              break;

            case TrapTypes.Types.STEP:
              const insideOuter = GeoLib.isPointWithinRadius(
                coordinate,
                trap.coordinate,
                trap.outerRadius || 0,
              );
              const insideInner = GeoLib.isPointWithinRadius(
                coordinate,
                trap.coordinate,
                trap.innerRadius || 0,
              );

              const stateMap = {
                [TrapTypes.States.OUTSIDE]: [
                  TrapTypes.States.ENTERED,
                  () => {
                    const isWithinCourse = isWithinCourse(
                      trap.step.bearing,
                      heading,
                      trap.courseTolerance,
                    );
                    return insideOuter
                      ? isWithinCourse
                        ? TrapTypes.Events.ENTERING_ON_COURSE
                        : TrapTypes.Events.ENTERING_OFF_COURSE
                      : false;
                  },
                ],

                [TrapTypes.States.ENTERED]: [
                  TrapTypes.States.INSIDE,
                  () => {
                    return insideOuter ? TrapTypes.Events.INSIDE : false;
                  },
                ],

                [TrapTypes.States.INSIDE]: [
                  TrapTypes.States.CENTER,
                  () => {
                    return insideInner ? TrapTypes.Events.INSIDE_CENTER : false;
                  },
                ],

                [TrapTypes.States.CENTER]: [
                  TrapTypes.States.LEAVING,
                  () => {
                    const isWithinCourse = isWithinCourse(
                      trap.nextStep ? trap.nextStep.bearing : trap.step.bearing,
                      heading,
                      trap.courseTolerance,
                    );
                    return insideOuter && !insideInner
                      ? isWithinCourse
                        ? TrapTypes.Events.LEAVING_ON_COURSE
                        : TrapTypes.Events.LEAVING_OFF_COURSE
                      : false;
                  },
                ],

                [TrapTypes.States.LEAVING]: [
                  TrapTypes.States.LEFT,
                  () => {
                    return !insideOuter && !insideInner
                      ? TrapTypes.Events.LEAVING
                      : false;
                  },
                ],

                [TrapTypes.States.LEFT]: [
                  TrapTypes.States.EXPIRED,
                  () => {
                    return true;
                  },
                ],
              };

              if (stateMap[trap.state]) {
                const func = stateMap[trap.state];
                const event = func[1]();
                if (event) {
                  nextState(trap, event, func[0]);
                }
              }
              break;
          }
        }
      });
    };

    const isWithinCourse = (
      bearing: number,
      heading: number,
      tolerance: number = 0,
    ) => {
      const low = bearing - tolerance;
      const high = bearing + tolerance;

      return (
        ((low < 0 && heading > 360 - -1 * low) || heading > low) &&
        ((high > 360 && heading < high - 360) || heading < high)
      );
    };

    // Call the necessary functions here

    // Clean-up function
    return () => {
      // Clean-up tasks, if any
    };
  }, [instance, counter, traps]);

  return null; // replace with your desired JSX content
};

export default Traps;
