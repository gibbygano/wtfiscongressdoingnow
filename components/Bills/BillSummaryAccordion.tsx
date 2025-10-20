import { MemberRoleBadge } from "components/Bills";
import { GroupedDetails, Status } from "components/shared";
import "dayjs";
import { TbBook, TbFileStack, TbUsersGroup } from "@preact-icons/tb";
import type { Action } from "types";
import { useBillSummaryContext } from "context";

const BillSummaryAccordion = () => {
  const {
    packageId,
    sponsors,
    references,
    summaryLoading,
    summaryError,
    actions,
    actionsLoading,
    actionsError,
    cardHasInteractionSignal,
  } = useBillSummaryContext();

  const sponsorSectionId = `${packageId}-sponsors`;
  const referenceSectionId = `${packageId}-references`;
  const actionSectionId = `${packageId}-actions`;

  return (
    <div onFocusInCapture={() => (cardHasInteractionSignal.value = true)}>
      <GroupedDetails
        packageId={packageId}
        title="Sponsors"
        icon={<TbUsersGroup class="w-6 h-6" />}
        sectionId={sponsorSectionId}
      >
        <Status error={summaryError} loading={summaryLoading}>
          <div class="prose prose-slate dark:prose-invert mb-5">
            {sponsors || summaryLoading ? (
              sponsors?.map(({ memberName, party, state, role }) => (
                <p>
                  {memberName} - {party} {state}
                  <br />
                  <MemberRoleBadge role={role} />
                </p>
              ))
            ) : (
              <p>No sponsers, check back later.</p>
            )}
          </div>
        </Status>
      </GroupedDetails>
      <GroupedDetails
        packageId={packageId}
        title="References"
        icon={<TbBook class="w-6 h-6" />}
        sectionId={referenceSectionId}
      >
        <Status error={summaryError} loading={summaryLoading}>
          <div class="prose prose-slate dark:prose-invert mb-5 ml-7">
            {references || summaryLoading ? (
              references?.map(({ contents }) => (
                <ul class="pl-2.5">
                  {contents.map(({ title, label, sections }) => (
                    <li>
                      <span class="whitespace-nowrap">
                        {title} {label}
                      </span>
                      &nbsp;
                      <ul class="pl-2.5">
                        {sections &&
                          sections.map((section) => (
                            <li>
                              <a
                                target="_blank"
                                href={`https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title${title}-section${section}&num=0&edition=prelim`}
                              >
                                §{section}
                              </a>
                              &nbsp;
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ))
            ) : (
              <p>No references, check back later.</p>
            )}
          </div>
        </Status>
      </GroupedDetails>
      <GroupedDetails
        packageId={packageId}
        title="Actions"
        icon={<TbFileStack class="w-6 h-6" />}
        sectionId={actionSectionId}
      >
        <Status error={actionsError} loading={actionsLoading}>
          <ul class="list rounded-box shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]n">
            {actions || actionsLoading ? (
              actions?.map(({ actionDate, text }: Action) => (
                <li class="list-row">
                  <div class="prose prose-slate dark:prose-invert">
                    <div class="font-bold text-nowrap">
                      {dayjs(actionDate).format("dddd MMMM D, YYYY")}
                    </div>
                    <p class="list-col-wrap">{text}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No actions, check back later.</p>
            )}
          </ul>
        </Status>
      </GroupedDetails>
    </div>
  );
};

export { BillSummaryAccordion };
