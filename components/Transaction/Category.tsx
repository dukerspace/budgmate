import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ICategoryViewDto } from '@/types/category'
import { CategoryType } from '@/utils/constant'
import * as IconCate from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {
  category: ICategoryViewDto
  isOpen: boolean
  onOpen: (open: boolean) => void
  categories: ICategoryViewDto[]
  onSelectCategory: (category: ICategoryViewDto) => void
}

const TransactionCategory: React.FC<Props> = ({
  category,
  isOpen,
  onOpen,
  categories,
  onSelectCategory
}) => {
  const t = useTranslations()

  const Icon = IconCate[category?.icon] as React.ElementType

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpen}>
        <DrawerTrigger className="w-full">
          <div
            className="p-4 bg-gray-100 rounded-xl shadow-sm mt-4 mb-4"
            onClick={() => onOpen(true)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                {Icon ? <Icon /> : null}
              </div>
              <div>
                <div className="font-medium">{category?.name}</div>
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="inset-0  bg-gray-100">
          <div className="mx-auto w-full ">
            <DrawerHeader>
              <DrawerTitle>{t('common.category')}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex flex-wrap  ">
                <div className="w-full max-w-md mx-auto p-4">
                  <div className="">
                    <Tabs defaultValue="expense" className="">
                      <TabsList>
                        <TabsTrigger value="expense">{t('common.expense')}</TabsTrigger>
                        <TabsTrigger value="income">{t('common.income')}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="expense">
                        <ScrollArea className="h-96 w-full rounded-md border">
                          {categories
                            ?.filter((x) => x.type == CategoryType.EXPENSE)
                            ?.map((cate, i) => {
                              const Icon = IconCate[cate.icon]

                              return (
                                <div key={i} className="p-1">
                                  <Button
                                    onClick={() => onSelectCategory(cate)}
                                    key={cate.id}
                                    className="w-full p-3 rounded-xl bg-gray-400 hover:bg-gray-200 transition-colors"
                                  >
                                    <Icon />
                                    <span className="text-sm">{cate.name}</span>
                                  </Button>
                                </div>
                              )
                            })}
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="income">
                        <ScrollArea className="h-96 w-full rounded-md border">
                          {categories
                            ?.filter((x) => x.type == CategoryType.INCOME)
                            ?.map((cate, i) => {
                              const Icon = IconCate[cate.icon]

                              return (
                                <div key={i} className="p-1">
                                  <Button
                                    onClick={() => onSelectCategory(cate)}
                                    key={cate.id}
                                    className="w-full p-3 rounded-xl bg-gray-400 hover:bg-gray-200 transition-colors"
                                  >
                                    <Icon />
                                    <span className="text-sm">{cate.name}</span>
                                  </Button>
                                </div>
                              )
                            })}
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => onOpen(false)}>
                  {t('common.cancel')}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default TransactionCategory
