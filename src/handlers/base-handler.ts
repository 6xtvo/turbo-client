import { Collection } from "discord.js";
import { Category } from "@app/structures/category";
import type { Module } from "@app/structures/module";
import fs from "fs";
import path from "path";

export class BaseHandler {
    public categories: Collection<string, Category<Module>>;
    public collection: Collection<string, Module>;

    /**
     * Sets a module in the collection.
     * @param module The module to be added to the collection.
     */
    public setModule(module: Module): void {
        this.collection.set(module.name, module)

        if (!this.categories.has(module.category)) {
            this.categories.set(module.category, new Category<Module>(module.category))
        } else {
            const category = this.categories.get(module.category)!
            
            if (!category.collection.has(module.name)) {
                category.collection.set(module.name, module)
            }
        }
    }

    /**
     * Sets multiple modules in the collection.
     * @param modules The modules to be added to the collection.
     */
    public setModules(modules: Module[]): void {
        modules.forEach(this.setModule)
    }

    public loadModules(path: string) {

    }
}