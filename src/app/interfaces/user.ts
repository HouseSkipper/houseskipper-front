export interface User {
    id?: string;
    photo?: string;
    username: string;
    firstname: string;
    lastname: string;
    password?: string;
    telephone?: string;
    role?: string;
    token?: string;
}

export interface Skill {
    id?: string;
    userId?: string;
    type: string;
    nb_works?: number;
    skillCategories: SkillCategory[];
}

export interface SkillCategory {
    name: string;
    subSkills: SubSkill[];
}

export interface SubSkill {
    id?: string;
    type: string;
    nb_works?: number;
}

export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}

