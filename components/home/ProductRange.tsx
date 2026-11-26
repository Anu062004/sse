import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, DocumentIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategoryCounts, products } from "@/lib/products";

export function ProductRange() {
  const categoryCounts = getCategoryCounts();

  return (
    <Section id="products">
      <Container>
        <SectionHeader
          label="The components"
          title={`${categoryCounts.length === 7 ? "Seven" : categoryCounts.length} components. One catalogue.`}
          intro="Hydraulic spools for backhoe loader, excavator and loader applications, seal kits for valves, rams and brakes, and the specialised parts that keep machines working."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 min-[481px]:grid-cols-2 min-[1101px]:grid-cols-4 min-[761px]:grid-cols-3">
          {categoryCounts.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="catalog-card lift reveal group flex flex-col overflow-hidden rounded-card bg-white text-navy"
            >
              <div className="relative h-[170px] overflow-hidden bg-[#0D1A3D]">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1101px) 25vw, (min-width: 761px) 33vw, (min-width: 481px) 50vw, 100vw"
                  className="zoom-img object-contain"
                />
              </div>
              <div className="grow-bar" />
              <div className="flex flex-1 flex-col gap-2.5 px-[22px] pb-6 pt-[22px]">
                <div className="flex items-center justify-between">
                  <span className="display text-lg font-bold text-muted">{category.index}</span>
                  <span className="rounded-full bg-sand px-2.5 py-[5px] text-[13px] font-semibold">
                    {category.count} {category.count === 1 ? "part" : "parts"}
                  </span>
                </div>
                <h3 className="display text-2xl font-bold leading-[1.05]">{category.name}</h3>
                <p className="flex-1 text-sm leading-normal text-[#4A5672]">{category.description}</p>
                <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
                  View parts <ArrowRightIcon size={14} />
                </span>
              </div>
            </Link>
          ))}

          <div className="reveal flex min-h-[360px] flex-col justify-between gap-7 rounded-card bg-navy p-7 text-white">
            <div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-navy">
                <DocumentIcon size={26} />
              </div>
              <h3 className="display mt-[22px] text-[28px] font-bold leading-none">
                The full product catalogue
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-white/75">
                {products.length} parts across spools, unloader spools and seal
                kits, labelled by machine and valve block.
              </p>
            </div>
            <ButtonLink href="/products" variant="light" size="sm" className="self-start">
              Browse the catalogue
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
