import { FormEvent, useEffect, useState } from 'react'
import {
  CaretDown,
  CaretUp,
  Check,
  GameController,
  StarFour,
} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Input } from '../Form/Input'
import { API } from '../../service/axios'

interface Games {
  id: string
  title: string
}

export function AdModal() {
  const [games, setGames] = useState<Games[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  async function handleListGames() {
    const response = await API.get('/games')

    setGames(response.data)
  }

  useEffect(() => {
    handleListGames()
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const data = Object.fromEntries(formData)

    try {
      await API.post(`/ads/${data.game}`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      })

      alert('Anúncio criado com sucesso')
    } catch (err) {
      console.log(err)
      alert('Error ao criar o anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <div className="bg-zinc-900 py-3 px-4 rounded  text-sm appearance-none">
              <Select.Root name="game">
                <Select.Trigger className=" w-[100%] flex items-center justify-between text-zinc-500 ">
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon>
                    <CaretDown size={18} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal className="flex w-full overflow-hidden rounded-md shadow-md shadow-black bg-zinc-900/70 backdrop-blur-md">
                  <Select.Content className="text-zinc-100">
                    <Select.SelectScrollUpButton className="flex items-center justify-center h-8 text-zinc-100 bg-gradient-to-b from-violet-500/40 to-zinc-500/0 ">
                      <CaretUp size={20} />
                    </Select.SelectScrollUpButton>

                    <Select.Viewport>
                      {games.map((game) => {
                        return (
                          <Select.Item
                            key={game.id}
                            value={game.id}
                            className="hover:bg-zinc-500 text-sm transition bg-[#2a2634] px-1 py-1 rounded text-white cursor-pointer"
                          >
                            <Select.ItemIndicator className="absolute left-2 text-violet-500">
                              <StarFour size={10} />
                            </Select.ItemIndicator>
                            <Select.ItemText>{game.title}</Select.ItemText>
                          </Select.Item>
                        )
                      })}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex w-full items-center justify-center h-8 text-zinc-100  bg-gradient-to-t from-violet-500/40 to-zinc-500/0">
                      <CaretDown size={20} />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col text-[12px] gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                className="grid grid-cols-4 gap-2"
                type="multiple"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Domingo"
                >
                  Dom
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Segunda"
                >
                  Seg
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Terça"
                >
                  Ter
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Quarta"
                >
                  Qua
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Quinta"
                >
                  Qui
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Sexta"
                >
                  Sex
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Sábado"
                >
                  Sáb
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual seu horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hourStart" name="hourStart" type="time" />
                <Input id="hourEnd" name="hourEnd" type="time" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
