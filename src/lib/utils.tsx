import React, { useEffect } from 'react';

import { DeltaTypes } from 'lib/primitives';
import { ValueFormater } from './inputTypes';

export const mapInputsToDeltaType = (deltaType: string, isIncreasePositive: boolean): string => {
    if (isIncreasePositive || deltaType===DeltaTypes.Unchanged) {
        return deltaType;
    }
    switch (deltaType) {
    case DeltaTypes.Increase:
        return DeltaTypes.Decrease;
    case DeltaTypes.ModerateIncrease:
        return DeltaTypes.ModerateDecrease;
    case DeltaTypes.Decrease:
        return DeltaTypes.Increase;
    case DeltaTypes.ModerateDecrease:
        return DeltaTypes.ModerateIncrease;
    }
    return '';
};

export const defaultValueFormater: ValueFormater = (value: number) => value.toString();

export const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: {(event: any): void}) => {
    useEffect(
        () => {
            const listener = (event: any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
};

export const removeValueFromArray = (value: any, array: any[]): any[] => {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};

export const isValueInArray = (value: any, array: any[]): boolean => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
};

export const stringIsNumeric = (str: string|undefined): boolean => {
    return !isNaN(Number(str)) && (str!==undefined);
};

export const stringEndsWithNumber = (str: string): boolean => {
    return stringIsNumeric(str.split('-').pop());
};