/**
 * 导出模板版本类型
 *
 * 单独成文件而不是挂在某个模板里：v1/v2/v3 都要引用它，
 * 放进任意一个模板文件都会造成「兄弟模板互相 import」的别扭依赖。
 */
export type TemplateVersion = 'v1' | 'v2' | 'v3';
